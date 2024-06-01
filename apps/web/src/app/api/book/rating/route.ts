import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from 'auth';
import { BOOK_ACTIONS_VALIDATIONS_API } from '@modules/books/validations/books.validations';
import { BookRatingPostResponse } from '@modules/api/types/books-api.types';

// /api/book/favourite POST : sets a book rating
export async function POST(request: NextRequest): Promise<NextResponse<BookRatingPostResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { bookId, rating } = BOOK_ACTIONS_VALIDATIONS_API.RATING.parse(json);

    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        rating: { set: rating },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
