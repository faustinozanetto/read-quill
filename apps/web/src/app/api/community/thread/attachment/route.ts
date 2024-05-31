import { ThreadAttachmentDeleteResponse } from '@modules/api/types/community-api.types';

import { THREAD_ATTACHMENT_ACTIONS_VALIDATIONS_API } from '@modules/community/validations/community-thread-attachment.validations';
import { deleteImageFromSupabase } from '@modules/uploads/lib/uploads.lib';

import { prisma } from '@read-quill/database';
import { auth } from 'auth';
import { NextRequest, NextResponse } from 'next/server';

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
        image: true,
      },
    });

    if (!threadAttachment) {
      return new NextResponse('Thread attachment not found', { status: 404 });
    }

    const isThreadOwner = threadAttachment.thread.authorId === session.user.id;
    if (!isThreadOwner) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const { error } = await deleteImageFromSupabase('ThreadAttachments', threadAttachment.image.path);
    if (error) {
      return new NextResponse('Failed to delete attachment!', { status: 500 });
    }

    await prisma.threadAttachment.delete({
      where: {
        id: attachmentId,
      },
    });
    await prisma.image.delete({
      where: {
        id: threadAttachment.image.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
