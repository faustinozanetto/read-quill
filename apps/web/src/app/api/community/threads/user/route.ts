import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadsUserGetResponse } from '@modules/api/types/community-api.types';
import { ThreadWithDetails } from '@modules/community/types/community.types.ts';
import { getThreadViews } from '@modules/community/lib/community-thread-views.lib';

// /api/community/threads/user GET : Gets community user threads
export async function GET(request: NextRequest): Promise<NextResponse<ThreadsUserGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor');
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: { message: 'User ID is missing!' } }, { status: 400 });
    }

    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');

    // Paginate the threads using cursor-based pagination
    const threads = await prisma.thread.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: pageSize,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      include: { author: { select: { id: true, name: true, image: true } }, comments: { select: { id: true } } },
    });

    // Calculate the total number of pages for pagination
    const hasMore = threads.length === pageSize;
    const nextCursor = hasMore ? threads[threads.length - 1].id : null;

    const threadViewsPromises = threads.map((thread) => getThreadViews(thread.id));
    const threadViews = await Promise.all(threadViewsPromises);

    const mappedThreads: ThreadWithDetails[] = threads.map((thread, index) => {
      const { comments, ...rest } = thread;
      return { ...rest, commentsCount: comments.length, views: threadViews[index] };
    });

    return NextResponse.json({ data: { threads: mappedThreads, nextCursor, hasMore } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
