import type { Prisma } from '@read-quill/database';
import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@modules/auth/lib/auth.lib';
import { calculateCriterias } from '@modules/achievements/lib/achievement-criterias.lib';

// /api/achievements/check POST : Checks if the user met the requirements for unlocking achievements.
export async function POST(): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    // Fetch database achievements
    const achievements = await prisma.achievement.findMany();

    // Fetch user-specific data
    const readRegistries = await prisma.readRegistry.findMany({
      where: { book: { readerId: session.user.id } },
      orderBy: { createdAt: 'asc' },
    });
    const books = await prisma.book.findMany({ where: { readerId: session.user.id } });

    const criteriaConditions = calculateCriterias(books, readRegistries);

    // Identify completed achievements
    const completedAchievements: string[] = achievements
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

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
