import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { UserBooksGetResponse } from '@modules/api/types/books-api.types';

// /api/books/user GET : Gets the books of the user
export async function GET(request: NextRequest): Promise<NextResponse<UserBooksGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);

    const pageIndex = Number.parseInt(searchParams.get('pageIndex') ?? '0');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');
    const userId = searchParams.get('userId');
    if (!userId) {
      return new NextResponse('Missing userId', { status: 500 });
    }

    // Paginate the books
    const books = await prisma.book.findMany({
      where: { readerId: userId },
      skip: pageSize * pageIndex,
      take: pageSize,
      include: {
        image: true,
        reader: true,
      },
    });

    // Fetch the total count of books
    const totalCount = await prisma.book.count({
      where: { readerId: userId },
    });

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);
    const hasMore = pageIndex < pageCount - 1;

    return NextResponse.json({ books, pageCount, hasMore });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
