import { authOptions } from '@modules/auth/lib/auth.lib';
import { bookReviewValidationSchemaAPI } from '@modules/books/validations/books.validations';
import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

// /api/books/rewiew POST : creates a book review
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const email = session.user?.email;
    if (!email) {
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

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/books/rewiew PATCH : updated a book review
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const email = session.user?.email;
    if (!email) {
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

    return new NextResponse(errorMessage, { status: 500 });
  }
}
