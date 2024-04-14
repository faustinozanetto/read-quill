import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { CommunityThreadsGetResponse } from '@modules/api/types/community-api.types';

// /api/community/threads GET : Gets community threads
export async function GET(request: NextRequest): Promise<NextResponse<CommunityThreadsGetResponse>> {
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
      include: { author: { select: { name: true, image: true } } },
    });

    // Fetch the total count of threads
    const totalCount = await prisma.thread.count();

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);
    const hasMore = pageIndex < pageCount - 1;

    return NextResponse.json({ threads, pageCount, hasMore });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
