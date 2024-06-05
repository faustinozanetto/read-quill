import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadCommentReplyPostResponse } from '@modules/api/types/community-api.types';
import { THREAD_COMMENT_ACTIONS_VALIDATIONS_API } from '@modules/community/validations/community-comment.validations';
import { auth } from 'auth';

// /api/community/thread/comment/reply POST : Creates a reply to a thread comment
export async function POST(request: NextRequest): Promise<NextResponse<ThreadCommentReplyPostResponse>> {
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
    const { commentId, threadId, content } = THREAD_COMMENT_ACTIONS_VALIDATIONS_API.REPLY.parse(json);

    const threadComment = await prisma.threadComment.create({
      data: {
        content,
        authorId: session.user.id,
        replyToId: commentId,
        threadId,
      },
    });

    return NextResponse.json({ data: { threadComment } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
