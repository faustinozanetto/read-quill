import type { Prisma } from '@read-quill/database';
import { prisma } from '@read-quill/database';
import { NextResponse } from 'next/server';
import type { AchievementsLockedGetResponse } from '@modules/api/types/achievements-api.types';
import { calculateCriterias } from '@modules/achievements/lib/achievement-criterias.lib';
import { auth } from 'auth';

// /api/achievements/locked GET : Gets the locked achievements of a user.
export async function GET(): Promise<NextResponse<AchievementsLockedGetResponse>> {
  try {
    const session = await auth();

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

    // Calculate criteria conditions
    const criteriaConditions = calculateCriterias(books, readRegistries);

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
