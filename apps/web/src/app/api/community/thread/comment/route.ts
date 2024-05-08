import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  ThreadCommentDeleteResponse,
  ThreadCommentPatchResponse,
  ThreadCommentPostResponse,
} from '@modules/api/types/community-api.types';
import {
  createThreadCommentValidationApiSchema,
  deleteThreadCommentValidationApiSchema,
  editThreadCommentValidationApiSchema,
} from '@modules/community/validations/community.validations';
import { auth } from 'auth';

// /api/community/thread/comment POST : Creates a thread comment
export async function POST(request: NextRequest): Promise<NextResponse<ThreadCommentPostResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { threadId, content } = createThreadCommentValidationApiSchema.parse(json);

    const threadComment = await prisma.threadComment.create({
      data: {
        threadId,
        content,
        authorId: session.user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/community/thread/comment PATCH : Updates a thread comment
export async function PATCH(request: NextRequest): Promise<NextResponse<ThreadCommentPatchResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { commentId, content } = editThreadCommentValidationApiSchema.parse(json);

    await prisma.threadComment.update({
      where: {
        id: commentId,
      },
      data: {
        content,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/community/thread/comment DELETE : Deletes a thread comment
export async function DELETE(request: NextRequest): Promise<NextResponse<ThreadCommentDeleteResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { commentId } = deleteThreadCommentValidationApiSchema.parse(json);

    await prisma.threadComment.delete({
      where: {
        id: commentId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
