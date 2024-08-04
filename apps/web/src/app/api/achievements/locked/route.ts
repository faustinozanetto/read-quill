import type { Prisma } from '@read-quill/database';
import { prisma } from '@read-quill/database';
import { NextRequest, NextResponse } from 'next/server';
import type { AchievementsLockedGetResponse } from '@modules/api/types/achievements-api.types';
import { calculateCriterias } from '@modules/achievements/lib/achievement-criterias.lib';
import { auth } from 'auth';
import { ACHIEVEMENT_CRITERIAS, AchievementCriterias } from '@modules/achievements/lib/achievement.constants';

// /api/achievements/locked GET : Gets the locked achievements of a user.
export async function GET(request: NextRequest): Promise<NextResponse<AchievementsLockedGetResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const criterias = searchParams.get('criterias');
    const parsedCriterias = criterias ? criterias.split(',') : ACHIEVEMENT_CRITERIAS;

    const [achievements, userUnlockedAchievements] = await Promise.all([
      prisma.achievement.findMany(),
      prisma.userAchievement.findMany({
        where: { userId: session.user.id },
        select: { achievementId: true, achievement: { select: { criteria: true } } },
      }),
    ]);

    // Extract the IDs of unlocked achievements
    const unlockedAchievementIds = userUnlockedAchievements.map((ua) => ua.achievementId);

    // Filter locked achievements
    const lockedAchievements = achievements.filter((achievement) => !unlockedAchievementIds.includes(achievement.id));

    const filteredAchievements = lockedAchievements.filter((achievement) => {
      const achievementCriteria = achievement.criteria;
      const criteriaKeys = new Set(Object.keys(achievementCriteria as object));
      return [...parsedCriterias].some((criteria) => criteriaKeys.has(criteria));
    });

    // Fetch user-specific data
    const [readRegistries, books, reviews] = await Promise.all([
      prisma.readRegistry.findMany({
        where: { book: { readerId: session.user.id } },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.book.findMany({ where: { readerId: session.user.id } }),
      prisma.review.findMany({
        where: {
          book: {
            readerId: session.user.id,
          },
        },
      }),
    ]);

    // Calculate criteria conditions
    const criteriaConditions = calculateCriterias(books, readRegistries, reviews);

    // Calculate percentage of completion for each locked achievement
    const achievementsWithProgress = filteredAchievements.map((lockedAchievement) => {
      const criteriaObject = lockedAchievement.criteria as Prisma.JsonObject;

      // Calculate user's progress for each criteria
      const progress = Object.entries(criteriaObject).reduce((acc, criteriaEntry) => {
        const [criteriaCondition, targetCriteriaValue] = criteriaEntry;
        const criteriaValue = criteriaConditions[criteriaCondition as AchievementCriterias] || 0;

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

    return NextResponse.json({ data: { lockedAchievements: achievementsWithProgress } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
