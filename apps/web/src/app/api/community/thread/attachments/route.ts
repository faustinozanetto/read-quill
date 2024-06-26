import { ThreadAttachmentsGetResponse } from '@modules/api/types/community-api.types';

import { prisma } from '@read-quill/database';
import { NextRequest, NextResponse } from 'next/server';

// /api/community/thread/attachments GET : Gets the thread attachments
export async function GET(request: NextRequest): Promise<NextResponse<ThreadAttachmentsGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return NextResponse.json({ error: { message: 'Thread ID is missing!' } }, { status: 400 });
    }

    const attachments = await prisma.threadAttachment.findMany({
      where: {
        threadId,
      },
      include: {
        image: true,
      },
    });

    return NextResponse.json({ data: { attachments } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
