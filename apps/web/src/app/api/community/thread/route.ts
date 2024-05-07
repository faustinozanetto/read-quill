import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadsGetResponse } from '@modules/api/types/community-api.types';
import { ThreadWithDetails } from '@modules/community/types/community.types';

// /api/community/thread GET : Gets a thread by a given threadId
export async function GET(request: NextRequest): Promise<NextResponse<ThreadsGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return new NextResponse('Thread ID is missing', { status: 400 });
    }

    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
      include: { author: { select: { name: true, image: true } }, comments: { select: { id: true } } },
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
