import { BookReviewDetailsLikesGetResponse } from '@modules/api/types/books-api.types';
import { BookReviewDetailsLikesEntry } from '@modules/books/types/book.types';
import { prisma } from '@read-quill/database';
import { NextRequest, NextResponse } from 'next/server';

// /api/book/review/details/likes GET : Gets the book review likes details
export async function GET(request: NextRequest): Promise<NextResponse<BookReviewDetailsLikesGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return NextResponse.json(
        {
          error: {
            message: 'Book Id is required!',
          },
        },
        { status: 400 }
      );
    }

    const pageIndex = Number.parseInt(searchParams.get('pageIndex') ?? '0');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');

    // Fetch read registries for the current page
    const reviewLikes = (await prisma.reviewLike.findMany({
      where: { review: { bookId } },
      select: {
        id: true,
        isLike: true,
        user: { select: { id: true, name: true, image: true } },
      },
      skip: pageSize * pageIndex,
      take: pageSize,
    })) as BookReviewDetailsLikesEntry[];

    // Fetch the total count of read registries
    const totalCount = await prisma.reviewLike.count({
      where: { review: { bookId } },
    });

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);

    return NextResponse.json({ data: { reviewLikes, pageCount } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
