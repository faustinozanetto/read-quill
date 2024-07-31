import { prisma } from '@read-quill/database';
import { NextRequest, NextResponse } from 'next/server';
import type { AchievementsPinnedGetResponse } from '@modules/api/types/achievements-api.types';
import type { AchievementWithUserAchievement } from '@modules/achievements/types/achievements.types';

// /api/achievements/pinned GET : Gets the pinned un-locked achievements of a user.
export async function GET(request: NextRequest): Promise<NextResponse<AchievementsPinnedGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json(
        {
          error: {
            message: 'User ID is required!',
          },
        },
        { status: 400 }
      );
    }

    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId, isPinned: true },
      include: { achievement: true },
    });

    const mapped: AchievementWithUserAchievement[] = userAchievements.map((achievement) => {
      return {
        ...achievement.achievement,
        unlockedAt: achievement.unlockedAt,
        isPinned: achievement.isPinned,
      };
    });

    return NextResponse.json({ data: { pinnedAchievements: mapped } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
