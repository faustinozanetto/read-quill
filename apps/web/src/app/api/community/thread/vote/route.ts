import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadVoteGetResponse, ThreadVotePostResponse } from '@modules/api/types/community-api.types';
import { auth } from 'auth';

import { storeUserThreadVoteInRedis } from '@modules/community/lib/community-thread-vote.lib';
import { THREAD_ACTIONS_VALIDATIONS_API } from '@modules/community/validations/community-thread.validations';
import { z } from 'zod';

// /api/community/thread/vote GET : Gets the thread vote count
export async function GET(request: NextRequest): Promise<NextResponse<ThreadVoteGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return NextResponse.json({ error: { message: 'Thread ID is required!' } }, { status: 400 });
    }

    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
      select: {
        votes: true,
      },
    });

    if (!thread) {
      return NextResponse.json(
        { error: { message: 'Thread not found!' } },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({ data: { votes: thread.votes } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/community/thread/vote POST : Votes a thread
export async function POST(request: NextRequest): Promise<NextResponse<ThreadVotePostResponse>> {
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
    const parsed = THREAD_ACTIONS_VALIDATIONS_API.VOTE.safeParse(json);
    if (!parsed.success) {
      const { errors } = parsed.error;
      const error = errors[0].message;
      return NextResponse.json({ error: { message: error } }, { status: 400 });
    }

    const { threadId, type } = parsed.data;

    // Use redis to avoid users voting multiple times.
    const voteResult = await storeUserThreadVoteInRedis(threadId, session.user.id, type);
    if (voteResult) {
      await prisma.thread.update({
        where: {
          id: threadId,
        },
        data: {
          votes: {
            increment: type === 'upvote' ? 1 : -1,
          },
        },
      });
    }

    return NextResponse.json({ data: { success: true, alredyVoted: !voteResult } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
