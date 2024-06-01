import { BookAnnotationsGetResponse } from '@modules/api/types/annotations-api.types';
import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// /api/book/annotations GET : Gets the book annotations by a given bookId
export async function GET(request: NextRequest): Promise<NextResponse<BookAnnotationsGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return new NextResponse('Book ID is missing', { status: 400 });
    }

    const pageIndex = Number.parseInt(searchParams.get('pageIndex') ?? '0');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');

    const annotations = await prisma.annotation.findMany({
      where: { bookId },
      skip: pageSize * pageIndex,
      take: pageSize,
    });

    // Fetch the total count of books
    const totalCount = await prisma.annotation.count({
      where: { bookId },
    });

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);
    const hasMore = pageIndex < pageCount - 1;

    return NextResponse.json({ annotations, hasMore, pageCount });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
