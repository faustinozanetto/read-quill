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

    // Paginate the books
    const books = await prisma.book.findMany({
      where: { readerId: session.user.id },
      skip: pageSize * pageIndex,
      take: pageSize,
    });

    // Fetch the total count of books
    const totalCount = await prisma.book.count({
      where: { readerId: session.user.id },
    });

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);
    const hasMore = pageIndex < pageCount - 1;

    // Get the read registries for the paginated books
    const bookIds = books.map((book) => book.id);
    const readRegistries = await prisma.readRegistry.findMany({
      where: { bookId: { in: bookIds } },
      include: { book: { select: { name: true, pageCount: true, image: true } } },
      cacheStrategy: { swr: 60, ttl: 60 },
    });

    // Calculate the progress for each book
    const booksProgress = readRegistries.reduce<Record<string, Omit<BookProgressEntry, 'id'>>>((acc, curr) => {
      const { bookId, pagesRead, book } = curr;
      const bookPageCount = book.pageCount;

      if (!acc[bookId]) {
        acc[bookId] = {
          progress: (pagesRead / bookPageCount) * 100,
          cover: book.image,
          name: book.name,
          completed: false,
        };
      } else {
        acc[bookId].progress += (pagesRead / bookPageCount) * 100;
      }

      acc[bookId].completed = acc[bookId].progress >= 100;

      acc[bookId].progress = Math.round(acc[bookId].progress);

      return acc;
    }, {});

    const mappedBooksProgress = Object.entries(booksProgress).map((entry) => {
      return {
        id: entry[0],
        ...entry[1],
      };
    });

    return NextResponse.json({ data: { booksProgress: mappedBooksProgress, pageCount, hasMore } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
