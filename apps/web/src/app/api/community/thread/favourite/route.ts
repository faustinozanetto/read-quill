import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from 'auth';

import { ThreadFavouriteGetResponse, ThreadFavouritePostResponse } from '@modules/api/types/community-api.types';
import { THREAD_ACTIONS_VALIDATIONS_API } from '@modules/community/validations/community-thread.validations';

// /api/community/thread/favourite GET : Gets if a thread is favourite or not for the user
export async function GET(request: NextRequest): Promise<NextResponse<ThreadFavouriteGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');
    const userId = searchParams.get('userId');

    if (!threadId) {
      return NextResponse.json({ error: { message: 'Thread ID is missing!' } }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: { message: 'User ID is missing!' } }, { status: 400 });
    }

    const userFavouriteThread = await prisma.userFavouriteThread.findMany({
      where: { threadId, userId },
    });
    if (!userFavouriteThread.length) {
      return NextResponse.json({ data: { isFavourite: false } });
    }

    return NextResponse.json({ data: { isFavourite: true } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/community/thread/favourite POST : Sets the thread as favourite or not
export async function POST(request: NextRequest): Promise<NextResponse<ThreadFavouritePostResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          error: {
            message: 'You must be logged in!',
          },
        },
        { status: 403 }
      );
    }

    const json = await request.json();
    const { threadId, isFavourite: isFavouriteAction } = THREAD_ACTIONS_VALIDATIONS_API.FAVOURITE.parse(json);

    const isThreadFavourite = await prisma.userFavouriteThread.findFirst({
      where: { userId: session.user.id, threadId },
    });

    // If the action is 'add' and the thread is not already marked as favorite,
    // add a record to the UserFavoriteThread table
    if (isFavouriteAction && !isThreadFavourite) {
      await prisma.userFavouriteThread.create({
        data: { userId: session.user.id, threadId },
      });
    } else if (!isFavouriteAction && isThreadFavourite) {
      await prisma.userFavouriteThread.deleteMany({
        where: { userId: session.user.id, threadId },
      });
    }

    return NextResponse.json({ data: { success: true, threadFavourite: isFavouriteAction } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
