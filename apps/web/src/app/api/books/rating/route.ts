import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { bookRatingValidationSchemaForm } from '@modules/books/validations/books.validations';
import { auth } from 'auth';

// /api/books/favourite POST : sets a book rating
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { bookId, rating } = bookRatingValidationSchemaForm.parse(json);

    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        rating,
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
