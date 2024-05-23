import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadPatchResponse, ThreadGetResponse, ThreadPostResponse } from '@modules/api/types/community-api.types';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import { auth } from 'auth';

import { extractAttachmentIdFromUrl } from '@modules/community/lib/thread-attachments.lib';
import { deleteFileFromSupabase } from '@modules/uploads/lib/uploads.lib';
import { THREAD_ACTIONS_VALIDATIONS_API } from '@modules/community/validations/community-thread.validations';

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
    const { content, title, keywords } = THREAD_ACTIONS_VALIDATIONS_API.CREATE.parse(json);

    const thread = await prisma.thread.create({
      data: {
        title,
        content: content.content,
        keywords: keywords.join(','),
        attachments: content.attachments
          ? {
              createMany: {
                data: content.attachments.map((attachment) => {
                  return {
                    description: attachment.description,
                    attachmentImage: attachment.url,
                  };
                }),
              },
            }
          : undefined,
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
    });

    const deleteAttachmentPromises: Promise<void>[] = threadAttachments.map(async (threadAttachment) => {
      const attachmentFileId = extractAttachmentIdFromUrl(threadAttachment.attachmentImage);

      const { error } = await deleteFileFromSupabase('ThreadAttachments', attachmentFileId);
      if (error) {
        throw new Error('Could not delete attachment!');
      }

      await prisma.threadAttachment.delete({
        where: {
          id: threadAttachment.id,
        },
      });
    });

    await Promise.all(deleteAttachmentPromises);

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
