import type { Prisma } from '@read-quill/database';
import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@modules/auth/lib/auth.lib';
import type { AchievementsLockedGetResponse } from '@modules/api/types/achievements-api.types';

// /api/achievements/locked GET : Gets the locked achievements of a user.
export async function GET(): Promise<NextResponse<AchievementsLockedGetResponse>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const achievements = await prisma.achievement.findMany();

    // Retrieve user's unlocked achievements
    const userUnlockedAchievements = await prisma.userAchievement.findMany({
      where: { userId: session.user.id },
      select: { achievementId: true },
    });

    // Extract the IDs of unlocked achievements
    const unlockedAchievementIds = userUnlockedAchievements.map((ua) => ua.achievementId);

    // Filter locked achievements
    const lockedAchievements = achievements.filter((achievement) => !unlockedAchievementIds.includes(achievement.id));

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

    // Calculate percentage of completion for each locked achievement
    const achievementsWithProgress = lockedAchievements.map((lockedAchievement) => {
      const criteriaObject = lockedAchievement.criteria as Prisma.JsonObject;

      // Calculate user's progress for each criteria
      const progress = Object.entries(criteriaObject).reduce((acc, criteriaEntry) => {
        const [criteriaCondition, targetCriteriaValue] = criteriaEntry;
        const criteriaValue = criteriaConditions[criteriaCondition] || 0;

        const conditionProgress = Math.min((criteriaValue / (targetCriteriaValue as number)) * 100, 100);

        return acc + conditionProgress;
      }, 0);

      // Calculate overall percentage of completion
      const overallProgress = progress / Object.keys(criteriaObject).length;

      return {
        ...lockedAchievement,
        completionPercentage: Math.round(overallProgress),
      };
    });

    return NextResponse.json({ lockedAchievements: achievementsWithProgress });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
