import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadPatchResponse, ThreadGetResponse, ThreadPostResponse } from '@modules/api/types/community-api.types';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import { auth } from 'auth';
import {
  createThreadValidationBaseSchema,
  deleteThreadValidationApiSchema,
  editThreadValidationApiSchema,
} from '@modules/community/validations/community-thread.validations';

// /api/community/thread GET : Gets a thread by a given threadId
export async function GET(request: NextRequest): Promise<NextResponse<ThreadGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return new NextResponse('Thread ID is missing', { status: 400 });
    }

    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
      include: { author: { select: { id: true, name: true, image: true } }, comments: { select: { id: true } } },
    });

    if (!thread) {
      return new NextResponse('Thread not found!', {
        status: 404,
      });
    }

    const { comments, ...rest } = thread;
    const mappedThread: ThreadWithDetails = {
      ...rest,
      commentsCount: comments.length,
    };

    return NextResponse.json({ thread: mappedThread });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/community/thread POST : Creates a thread
export async function POST(request: NextRequest): Promise<NextResponse<ThreadPostResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const data = createThreadValidationBaseSchema.parse(json);

    const thread = await prisma.thread.create({
      data: {
        ...data,
        authorId: session.user.id,
      },
      include: { author: { select: { id: true, name: true, image: true } }, comments: { select: { id: true } } },
    });

    const { comments, ...rest } = thread;
    const mappedThread: ThreadWithDetails = {
      ...rest,
      commentsCount: comments.length,
    };

    return NextResponse.json({ thread: mappedThread });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/community/thread PATCH : Updates a thread
export async function PATCH(request: NextRequest): Promise<NextResponse<ThreadPatchResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { threadId, ...data } = editThreadValidationApiSchema.parse(json);

    const thread = await prisma.thread.findUnique({
      where: {
        id: threadId,
      },
    });

    if (!thread) {
      return new NextResponse('Thread not found', { status: 404 });
    }

    const isThreadOwner = thread.authorId === session.user.id;
    if (!isThreadOwner) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    await prisma.thread.update({
      where: {
        id: threadId,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/community/thread DELETE : Deletes a thread
export async function DELETE(request: NextRequest): Promise<NextResponse<ThreadPatchResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { threadId } = deleteThreadValidationApiSchema.parse(json);

    const thread = await prisma.thread.findUnique({
      where: {
        id: threadId,
      },
    });

    if (!thread) {
      return new NextResponse('Thread not found', { status: 404 });
    }

    const isThreadOwner = thread.authorId === session.user.id;
    if (!isThreadOwner) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    await prisma.thread.delete({
      where: {
        id: threadId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
