import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  ThreadCommentDeleteResponse,
  ThreadCommentPatchResponse,
  ThreadCommentPostResponse,
} from '@modules/api/types/community-api.types';

import { auth } from 'auth';
import { THREAD_COMMENT_ACTIONS_VALIDATIONS_API } from '@modules/community/validations/community-comment.validations';

// /api/community/thread/comment POST : Creates a thread comment
export async function POST(request: NextRequest): Promise<NextResponse<ThreadCommentPostResponse>> {
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
    const { threadId, content } = THREAD_COMMENT_ACTIONS_VALIDATIONS_API.CREATE.parse(json);

    const threadComment = await prisma.threadComment.create({
      data: {
        threadId,
        content,
        authorId: session.user.id,
      },
    });

    return NextResponse.json({ data: { threadComment } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/community/thread/comment PATCH : Updates a thread comment
export async function PATCH(request: NextRequest): Promise<NextResponse<ThreadCommentPatchResponse>> {
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
    const { commentId, content } = THREAD_COMMENT_ACTIONS_VALIDATIONS_API.EDIT.parse(json);

    const threadComment = await prisma.threadComment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!threadComment) {
      return NextResponse.json({ error: { message: 'Thread comment not found!' } }, { status: 404 });
    }

    const isThreadCommentOwner = threadComment.authorId === session.user.id;
    if (!isThreadCommentOwner) {
      return NextResponse.json(
        {
          error: {
            message: 'You are not the thread comment owner!',
          },
        },
        { status: 403 }
      );
    }

    const updatedThreadComment = await prisma.threadComment.update({
      where: {
        id: commentId,
      },
      data: {
        content,
        isEdited: true,
      },
    });

    return NextResponse.json({ data: { threadComment: updatedThreadComment } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/community/thread/comment DELETE : Deletes a thread comment
export async function DELETE(request: NextRequest): Promise<NextResponse<ThreadCommentDeleteResponse>> {
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
    const { commentId } = THREAD_COMMENT_ACTIONS_VALIDATIONS_API.DELETE.parse(json);

    const threadComment = await prisma.threadComment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!threadComment) {
      return NextResponse.json({ error: { message: 'Thread comment not found' } }, { status: 404 });
    }

    const isThreadCommentOwner = threadComment.authorId === session.user.id;
    if (!isThreadCommentOwner) {
      return NextResponse.json(
        {
          error: {
            message: 'You are not the thread comment owner!',
          },
        },
        { status: 403 }
      );
    }

    await prisma.threadComment.delete({
      where: {
        id: commentId,
      },
    });

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
