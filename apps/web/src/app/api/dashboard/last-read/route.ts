import { DashboardLastReadGetResponse } from '@modules/api/types/dashboard-api.types';
import { DashboardLastReadEntry } from '@modules/dashboard/types/dashboard.types';
import { prisma } from '@read-quill/database';
import { auth } from 'auth';
import { NextRequest, NextResponse } from 'next/server';

// /api/dashboard/last-read GET : Gets the last X read books.
export async function GET(request: NextRequest): Promise<NextResponse<DashboardLastReadGetResponse>> {
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
    const take = Number.parseInt(searchParams.get('take') ?? '4');

    const books = await prisma.book.findMany({
      where: {
        readerId: session.user.id,
        readRegistries: {
          some: {},
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        createdAt: true,
        readRegistries: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: { createdAt: true },
        },
      },
    });

    const sortedBooks = books
      .map((book) => ({
        ...book,
        lastReadDate: book.readRegistries[0].createdAt,
      }))
      .sort((a, b) => new Date(b.lastReadDate).getTime() - new Date(a.lastReadDate).getTime())
      .slice(0, take);

    // const base64PlaceholderPromises = sortedBooks.map((book) =>
    //   generatePlaceholderImage(getImagePublicUrl('BookCovers', book.image.path))
    // );

    // const placeholderImages = await Promise.all(base64PlaceholderPromises);

    const mappedBooks: DashboardLastReadEntry[] = sortedBooks.map((book, index) => ({
      book: {
        ...book,
        // placeholderImage: {
        //   blurUrl: placeholderImages[index],
        // },
      },
      date: book.lastReadDate,
    }));

    return NextResponse.json({ data: { books: mappedBooks } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
