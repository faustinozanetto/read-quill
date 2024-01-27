import type { Prisma } from '@read-quill/database';
import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@modules/auth/lib/auth.lib';

// /api/achievements/check POST : Checks if the user met the requirements for unlocking achievements.
export async function POST(): Promise<NextResponse> {
  try {
    // Retrieve user session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    // Fetch database achievements
    const databaseAchievements = await prisma.achievement.findMany();

    // Fetch user-specific data
    const readRegistries = await prisma.readRegistry.findMany({ where: { book: { readerId: session.user.id } } });
    const books = await prisma.book.findMany({ where: { readerId: session.user.id } });

    // Calculate pages read for each book
    const booksPagesRead = readRegistries.reduce<Record<string, number>>((acc, curr) => {
      const key = curr.bookId;
      acc[key] = (acc[key] || 0) + curr.pagesRead;
      return acc;
    }, {});

    // Calculate criteria conditions
    const criteriaConditions: Record<string, number> = {
      pagesRead: readRegistries.reduce((acc, curr) => acc + curr.pagesRead, 0),
      booksRead: books.reduce((acc, curr) => (booksPagesRead[curr.id] >= curr.pageCount ? acc + 1 : acc), 0),
    };

    // Identify completed achievements
    const completedAchievements: string[] = databaseAchievements
      .filter((achievement) => {
        const criteriaObject = achievement.criteria as Prisma.JsonObject;

        return Object.entries(criteriaObject).every(([criteriaCondition, targetCriteriaValue]) => {
          const criteriaValue = criteriaConditions[criteriaCondition] || 0;
          return criteriaValue >= (targetCriteriaValue as number);
        });
      })
      .map((achievement) => achievement.id);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { achievements: true },
    });

    const unlockedAchievements = user?.achievements.map((ach) => ach.achievementId) || [];
    const newUnlockedAchievements = completedAchievements.filter(
      (achievementId) => !unlockedAchievements.includes(achievementId)
    );

    if (newUnlockedAchievements.length > 0) {
      const unlockPromises = newUnlockedAchievements.map((achievementId) =>
        prisma.userAchievement.create({
          data: {
            userId: session.user.id,
            achievementId,
            unlockedAt: new Date(),
          },
        })
      );

      await Promise.all(unlockPromises);
    }

    return NextResponse.json({ userAchievements: completedAchievements });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
