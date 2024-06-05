import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from 'auth';
import { BOOK_ACTIONS_VALIDATIONS_API } from '@modules/books/validations/books.validations';
import { BookFavouritePostResponse } from '@modules/api/types/books-api.types';

// /api/book/favourite POST : sets book as favourite or not
export async function POST(request: NextRequest): Promise<NextResponse<BookFavouritePostResponse>> {
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

    const json = await request.json();
    const { bookId, isFavourite } = BOOK_ACTIONS_VALIDATIONS_API.FAVOURITE.parse(json);

    const book = await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        isFavourite,
      },
    });

    return NextResponse.json({ data: { isFavourite: book.isFavourite } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
