import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadsCommunityGetResponse } from '@modules/api/types/community-api.types';
import { ThreadWithDetails } from '@modules/community/types/community.types.ts';

// /api/community/threads GET : Gets community threads
export async function GET(request: NextRequest): Promise<NextResponse<ThreadsCommunityGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');

    // Paginate the threads using cursor-based pagination
    const threads = await prisma.thread.findMany({
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      include: { author: { select: { id: true, name: true, image: true } }, comments: { select: { id: true } } },
    });

    // Calculate the total number of pages for pagination
    const hasMore = threads.length === pageSize;
    const nextCursor = hasMore ? threads[threads.length - 1].id : null;

    const mappedThreads: ThreadWithDetails[] = threads.map((thread) => {
      const { comments, ...rest } = thread;
      return { ...rest, commentsCount: comments.length };
    });

    return NextResponse.json({ threads: mappedThreads, nextCursor, hasMore });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
