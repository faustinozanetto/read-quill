import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  bookReviewValidationSchemaAPI,
  deleteBookReviewValidationSchemaAPI,
} from '@modules/books/validations/books.validations';
import { auth } from 'auth';

// /api/books/rewiew POST : creates a book review
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { bookId, review } = bookReviewValidationSchemaAPI.parse(json);

    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        review,
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

// /api/books/rewiew PATCH : Update a book review
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { bookId, review } = bookReviewValidationSchemaAPI.parse(json);

    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        review,
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

// /api/books/rewiew DELETE : Delete a book review
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { bookId } = deleteBookReviewValidationSchemaAPI.parse(json);

    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        review: { set: null },
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
