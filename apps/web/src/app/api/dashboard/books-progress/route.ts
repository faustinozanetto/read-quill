import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { DashboardBooksProgressGetResponse } from '@modules/api/types/dashboard-api.types';
import { auth } from 'auth';
import { BookProgressEntry } from '@modules/dashboard/types/dashboard.types';

// /api/dashboard/books-progress GET : Gets the reading progress of the user books
export async function GET(request: NextRequest): Promise<NextResponse<DashboardBooksProgressGetResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          error: {
            message: 'You must be logged in!',
          },
        },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const pageIndex = Number.parseInt(searchParams.get('pageIndex') ?? '0');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');

    const [books, totalCount] = await Promise.all([
      prisma.book.findMany({
        where: { readerId: session.user.id },
        skip: pageSize * pageIndex,
        take: pageSize,
        select: {
          id: true,
          name: true,
          image: true,
          pageCount: true,
          readRegistries: {
            select: {
              pagesRead: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
      prisma.book.count({
        where: { readerId: session.user.id },
      }),
    ]);

    if (!books.length) {
      return NextResponse.json({ data: { booksProgress: [], pageCount: 0, hasMore: false } });
    }

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);
    const hasMore = pageIndex < pageCount - 1;

    // Get the read registries for the paginated books
    const bookIds = books.map((book) => book.id);

    // Calculate the progress for each book
    const booksProgress: BookProgressEntry[] = books.map((book) => {
      const totalPagesRead = book.readRegistries.reduce((total, registry) => total + registry.pagesRead, 0);
      const progress = (totalPagesRead / book.pageCount) * 100;

      return {
        id: book.id,
        name: book.name,
        cover: book.image,
        progress: Math.round(progress),
        completed: progress >= 100,
      };
    });

    console.log({ booksProgress, bookIds, books });

    return NextResponse.json({ data: { booksProgress, pageCount, hasMore } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
