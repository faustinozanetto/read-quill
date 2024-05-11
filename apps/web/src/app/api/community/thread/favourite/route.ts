import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from 'auth';
import { favouriteThreadValidationSchema } from '@modules/community/validations/community-thread.validations';
import { ThreadFavouriteGetResponse, ThreadFavouritePostResponse } from '@modules/api/types/community-api.types';

// /api/community/thread/favourite GET : Gets if a thread is favourite or not for the user
export async function GET(request: NextRequest): Promise<NextResponse<ThreadFavouriteGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');
    const userId = searchParams.get('userId');

    if (!threadId) {
      return new NextResponse('Thread ID is missing', { status: 400 });
    }

    if (!userId) {
      return new NextResponse('User ID is missing', { status: 400 });
    }

    const userFavouriteThread = await prisma.userFavouriteThread.findMany({
      where: { threadId, userId },
    });
    if (userFavouriteThread.length === 0) {
      return NextResponse.json({ isFavourite: false });
    }

    return NextResponse.json({ isFavourite: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/community/thread/favourite POST : Sets the thread as favourite or not
export async function POST(request: NextRequest): Promise<NextResponse<ThreadFavouritePostResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { threadId, isFavourite: isFavouriteAction } = favouriteThreadValidationSchema.parse(json);

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

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
