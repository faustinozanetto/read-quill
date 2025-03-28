import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { UserBooksGetResponse } from '@modules/api/types/books-api.types';
import { BookWithDetails } from '@modules/books/types/book.types';

// /api/book/user GET : Gets the books of the user
export async function GET(request: NextRequest): Promise<NextResponse<UserBooksGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);

    const pageIndex = Number.parseInt(searchParams.get('pageIndex') ?? '0');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json(
        {
          error: {
            message: 'User ID is required!',
          },
        },
        { status: 400 }
      );
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    // const bookPlaceholderImagePromises = books.map((book) =>
    //   generatePlaceholderImage(getImagePublicUrl('BookCovers', book.image.path))
    // );

    // const placeholderImages = await Promise.all(bookPlaceholderImagePromises);

    const mappedBooks: BookWithDetails[] = books.map((book, index) => {
      return {
        // placeholderImage: {
        //   blurUrl: placeholderImages[index],
        // },
        ...book,
      };
    });

    // Fetch the total count of books
    const totalCount = await prisma.book.count({
      where: { readerId: userId },
    });

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);
    const hasMore = pageIndex < pageCount - 1;

    return NextResponse.json({ data: { books: mappedBooks, pageCount, hasMore } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
