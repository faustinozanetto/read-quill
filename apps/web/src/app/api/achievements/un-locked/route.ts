import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@modules/auth/lib/auth.lib';
import type { AchievementsUnLockedGetResponse } from '@modules/api/types/achievements-api.types';
import type { AchievementWithUserAchievement } from '@modules/achievements/types/achievements.types';

// /api/achievements/un-locked GET : Gets the un-locked achievements of a user.
export async function GET(): Promise<NextResponse<AchievementsUnLockedGetResponse>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId: session.user.id },
      include: { achievement: true },
    });

    const mapped: AchievementWithUserAchievement[] = userAchievements.map((achievement) => {
      return {
        ...achievement.achievement,
        unlockedAt: achievement.unlockedAt,
      };
    });

    return NextResponse.json({ unLockedAchievements: mapped });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
