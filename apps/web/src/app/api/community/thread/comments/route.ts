import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadCommentsGetResponse } from '@modules/api/types/community-api.types';

// /api/community/thread/comments GET : Gets the comments of a thread
export async function GET(request: NextRequest): Promise<NextResponse<ThreadCommentsGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return new NextResponse('Thread ID is missing', { status: 400 });
    }

    const pageIndex = Number.parseInt(searchParams.get('pageIndex') ?? '0');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');

    // Paginate the threads
    const threadComments = await prisma.threadComment.findMany({
      where: { threadId },
      skip: pageSize * pageIndex,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Fetch the total count of threads
    const totalCount = await prisma.threadComment.count({ where: { threadId } });

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);
    const hasMore = pageIndex < pageCount - 1;

    return NextResponse.json({ comments: threadComments, pageCount, hasMore });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
