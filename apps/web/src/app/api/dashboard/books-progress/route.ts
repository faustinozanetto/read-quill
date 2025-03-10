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
        where: {
          readerId: session.user.id,
          readRegistries: {
            some: {},
          },
        },
        skip: pageSize * pageIndex,
        take: pageSize,
        select: {
          id: true,
          name: true,
          image: true,
          pageCount: true,
          author: true,
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
        where: {
          readerId: session.user.id,
          readRegistries: {
            some: {},
          },
        },
      }),
    ]);

    if (!books.length) {
      return NextResponse.json({ data: { booksProgress: [], pageCount: 0, hasMore: false } });
    }

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);
    const hasMore = pageIndex < pageCount - 1;

    // Generate placeholder images
    // const base64PlaceholderPromises = books.map((book) =>
    //   generatePlaceholderImage(getImagePublicUrl('BookCovers', book.image.path))
    // );

    // const placeholderImages = await Promise.all(base64PlaceholderPromises);

    // Calculate the progress for each book
    const booksProgress: BookProgressEntry[] = books.map((book, index) => {
      const totalPagesRead = book.readRegistries.reduce((total, registry) => total + registry.pagesRead, 0);
      const progress = (totalPagesRead / book.pageCount) * 100;

      return {
        id: book.id,
        name: book.name,
        author: book.author,
        cover: book.image,
        // placeholderCover: { blurUrl: placeholderImages[index] },
        progress: Math.round(progress),
        completed: progress >= 100,
      };
    });

    return NextResponse.json({ data: { booksProgress, pageCount, hasMore } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
