import { prisma } from '@read-quill/database';
import { NextRequest, NextResponse } from 'next/server';
import type { AchievementsTogglePinnedPostResponse } from '@modules/api/types/achievements-api.types';
import { auth } from 'auth';
import { ACHIEVEMENT_ACTIONS_VALIDATIONS_API } from '@modules/achievements/lib/achievements.validations';
import { z } from 'zod';

// /api/achievements/toggle-pinned POST : Toggles a user achievement pinned state.
export async function POST(request: NextRequest): Promise<NextResponse<AchievementsTogglePinnedPostResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { achievementId } = ACHIEVEMENT_ACTIONS_VALIDATIONS_API.TOGGLE_PINNED.parse(json);

    const userAchievement = await prisma.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId: session.user.id,
          achievementId,
        },
      },
      select: {
        isPinned: true,
      },
    });

    if (!userAchievement) {
      return NextResponse.json(
        {
          error: {
            message: 'User achievement not found!',
          },
        },
        { status: 404 }
      );
    }

    const updatedUserAchievement = await prisma.userAchievement.update({
      where: {
        userId_achievementId: {
          userId: session.user.id,
          achievementId,
        },
      },
      data: {
        isPinned: !userAchievement.isPinned,
      },
    });

    return NextResponse.json({ data: { isPinned: updatedUserAchievement.isPinned } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
