import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadsCommunityTrendingGetResponse } from '@modules/api/types/community-api.types';
import { startOfWeek, subDays } from 'date-fns';
import { ThreadWithDetails } from '@modules/community/types/community.types';

// /api/community/threads/trending GET : Gets trending community threads
export async function GET(request: NextRequest): Promise<NextResponse<ThreadsCommunityTrendingGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');
    const weak = subDays(new Date(), 10);

    const threads = await prisma.thread.findMany({
      take: pageSize,
      orderBy: {
        votes: 'desc',
      },
      where: {
        createdAt: {
          gt: weak,
        },
      },
      include: { author: { select: { id: true, name: true, image: true } }, comments: { select: { id: true } } },
    });

    const mappedThreads: ThreadWithDetails[] = threads.map((thread) => {
      const { comments, ...rest } = thread;
      return { ...rest, commentsCount: comments.length };
    });

    return NextResponse.json({ threads: mappedThreads });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
