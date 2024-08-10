import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { BookInsightsGetResponse } from '@modules/api/types/books-api.types';

// /api/book/insights GET : Gets the book insights
export async function GET(request: NextRequest): Promise<NextResponse<BookInsightsGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return NextResponse.json(
        {
          error: {
            message: 'Book ID is required!',
          },
        },
        { status: 400 }
      );
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: {
        pageCount: true,
        readRegistries: { orderBy: { createdAt: 'desc' }, select: { createdAt: true, pagesRead: true } },
      },
    });
    if (!book) {
      return NextResponse.json(
        {
          error: {
            message: 'Book not found!',
          },
        },
        { status: 404 }
      );
    }

    const totalPagesRead = book.readRegistries.reduce((total, registry) => total + registry.pagesRead, 0);
    const progress = Math.min(Math.round((totalPagesRead / book.pageCount) * 100), 100);
    const sessionsCount = book.readRegistries.length;
    const lastRead = sessionsCount > 0 ? book.readRegistries[0].createdAt : undefined;

    return NextResponse.json({ data: { pagesRead: totalPagesRead, progress, lastRead, sessionsCount } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
