import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadPatchResponse, ThreadGetResponse, ThreadPostResponse } from '@modules/api/types/community-api.types';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import { auth } from 'auth';

import { THREAD_ACTIONS_VALIDATIONS_API } from '@modules/community/validations/community-thread.validations';
import { getThreadViews } from '@modules/community/lib/community-thread-views.lib';
import { deleteImageFromSupabase, deleteImagesFromSupabase } from '@modules/uploads/lib/uploads.lib';

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

    const views = await getThreadViews(threadId);

    const { comments, ...rest } = thread;
    const mappedThread: ThreadWithDetails = {
      ...rest,
      commentsCount: comments.length,
      views,
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
    const { content, title, keywords } = THREAD_ACTIONS_VALIDATIONS_API.CREATE.parse(json);

    const thread = await prisma.thread.create({
      data: {
        title,
        content: content,
        keywords: keywords.join(','),
        authorId: session.user.id,
      },
      include: { author: { select: { id: true, name: true, image: true } }, comments: { select: { id: true } } },
    });

    const views = await getThreadViews(thread.id);

    const { comments, ...rest } = thread;
    const mappedThread: ThreadWithDetails = {
      ...rest,
      commentsCount: comments.length,
      views,
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
    const { threadId, ...data } = THREAD_ACTIONS_VALIDATIONS_API.EDIT.parse(json);

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

    const { title, keywords, content } = data;

    await prisma.thread.update({
      where: {
        id: threadId,
      },
      data: {
        title,
        content,
        keywords: keywords.join(','),
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
    const { threadId } = THREAD_ACTIONS_VALIDATIONS_API.DELETE.parse(json);

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

    // Handle the deletion of the asocaited thread attachments
    const threadAttachments = await prisma.threadAttachment.findMany({
      where: {
        threadId,
      },
      include: {
        image: true,
      },
    });

    const deleteAttachmentPromises: Promise<void>[] = threadAttachments.map(async (threadAttachment) => {
      await prisma.threadAttachment.delete({
        where: {
          id: threadAttachment.id,
        },
      });
      await prisma.image.delete({ where: { id: threadAttachment.image.id } });
    });
    await Promise.all(deleteAttachmentPromises);

    const attachmentsImagePaths = threadAttachments.map((attachment) => attachment.image.path);
    const { error } = await deleteImagesFromSupabase('ThreadAttachments', attachmentsImagePaths);
    if (error) {
      throw new NextResponse('Could not delete thread!', { status: 500 });
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
