import { prisma } from '@read-quill/database';
import { NextResponse } from 'next/server';
import type { BooksNamesGetResponse } from '@modules/api/types/books-api.types';
import { auth } from 'auth';

// /api/book/names GET : Gets the user books names and ids and photos.
export async function GET(): Promise<NextResponse<BooksNamesGetResponse>> {
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

    const booksNames = await prisma.book.findMany({
      where: { readerId: session.user.id },
      select: { id: true, name: true, image: true },
    });

    return NextResponse.json({ data: { booksNames } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
