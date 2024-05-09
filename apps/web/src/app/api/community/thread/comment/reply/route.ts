import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadCommentReplyPostResponse } from '@modules/api/types/community-api.types';
import { threadCommentReplyValidationApichema } from '@modules/community/validations/community.validations';
import { auth } from 'auth';

// /api/community/thread/comment/reply POST : Creates a reply to a thread comment
export async function POST(request: NextRequest): Promise<NextResponse<ThreadCommentReplyPostResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { commentId, threadId, content } = threadCommentReplyValidationApichema.parse(json);

    const threadComment = await prisma.threadComment.create({
      data: {
        content,
        authorId: session.user.id,
        replyToId: commentId,
        threadId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
