import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@modules/auth/lib/auth.lib';
import type { BooksNamesGetResponse } from '@modules/api/types/books-api.types';

// /api/books/names GET : Gets the user books names and ids.
export async function GET(): Promise<NextResponse<BooksNamesGetResponse>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const booksNames = await prisma.book.findMany({
      where: { readerId: session.user.id },
      select: { id: true, name: true },
    });

    return NextResponse.json({ booksNames });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
