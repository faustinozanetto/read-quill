import { ThreadAttachmentDeleteResponse, ThreadAttachmentsGetResponse } from '@modules/api/types/community-api.types';
import { extractAttachmentIdFromUrl } from '@modules/community/lib/thread-attachments.lib';
import { THREAD_ATTACHMENT_ACTIONS_VALIDATIONS_API } from '@modules/community/validations/community-thread-attachment.validations';

import { deleteFileFromSupabase } from '@modules/uploads/lib/uploads.lib';
import { prisma } from '@read-quill/database';
import { auth } from 'auth';
import { NextRequest, NextResponse } from 'next/server';

// /api/community/thread/attachment GET : Gets the thread attachmeents
export async function GET(request: NextRequest): Promise<NextResponse<ThreadAttachmentsGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return new NextResponse('Thread ID is missing', { status: 400 });
    }

    const attachments = await prisma.threadAttachment.findMany({
      where: {
        threadId,
      },
    });

    return NextResponse.json({ attachments });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/community/thread/attachment DELETE : Deletes a thread attachment
export async function DELETE(request: NextRequest): Promise<NextResponse<ThreadAttachmentDeleteResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { attachmentId } = THREAD_ATTACHMENT_ACTIONS_VALIDATIONS_API.DELETE.parse(json);

    const threadAttachment = await prisma.threadAttachment.findUnique({
      where: {
        id: attachmentId,
      },
      include: {
        thread: {
          select: {
            authorId: true,
          },
        },
      },
    });

    if (!threadAttachment) {
      return new NextResponse('Thread attachment not found', { status: 404 });
    }

    const isThreadOwner = threadAttachment.thread.authorId === session.user.id;
    if (!isThreadOwner) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const attachmentFileId = extractAttachmentIdFromUrl(threadAttachment.attachmentImage);

    const { error } = await deleteFileFromSupabase('ThreadAttachments', attachmentFileId);
    if (error) {
      return new NextResponse('Could not delete attachment!', { status: 500 });
    }

    await prisma.threadAttachment.delete({
      where: {
        id: attachmentId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
