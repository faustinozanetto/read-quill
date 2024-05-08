import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadsCommunityGetResponse } from '@modules/api/types/community-api.types';
import { ThreadWithDetails } from '@modules/community/types/community.types.ts';

// /api/community/threads GET : Gets community threads
export async function GET(request: NextRequest): Promise<NextResponse<ThreadsCommunityGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const pageIndex = Number.parseInt(searchParams.get('pageIndex') ?? '0');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');

    // Paginate the threads
    const threads = await prisma.thread.findMany({
      skip: pageSize * pageIndex,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
      include: { author: { select: { id: true, name: true, image: true } }, comments: { select: { id: true } } },
    });

    // Fetch the total count of threads
    const totalCount = await prisma.thread.count();

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);
    const hasMore = pageIndex < pageCount - 1;

    const mappedThreads: ThreadWithDetails[] = threads.map((thread) => {
      const { comments, ...rest } = thread;
      return { ...rest, commentsCount: comments.length };
    });

    return NextResponse.json({ threads: mappedThreads, pageCount, hasMore });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
