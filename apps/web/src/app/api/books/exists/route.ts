import { prisma } from '@read-quill/database';
import { NextRequest, NextResponse } from 'next/server';

// /api/books/exists GET : Gets wether a book exists or not.
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return new NextResponse('Book ID is missing', { status: 400 });
    }

    const count = await prisma.book.count({ where: { id: bookId } });
    return NextResponse.json({ exists: count > 0 });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
