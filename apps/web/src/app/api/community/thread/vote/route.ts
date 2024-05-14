import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadVotePostResponse } from '@modules/api/types/community-api.types';
import { auth } from 'auth';
import { voteThreadValidationSchema } from '@modules/community/validations/community-thread.validations';
import { storeUserThreadVoteInRedis } from '@modules/community/lib/community-thread-vote.lib';

// /api/community/thread/vote POST : Votes a thread
export async function POST(request: NextRequest): Promise<NextResponse<ThreadVotePostResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { threadId, type } = voteThreadValidationSchema.parse(json);

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

    return NextResponse.json({ success: true, alredyVoted: !voteResult });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
