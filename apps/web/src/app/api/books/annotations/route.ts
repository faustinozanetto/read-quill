import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { BookAnnotationsGetResponse } from '@modules/api/types/books-api.types';

// /api/books/annotations GET : Gets the book annotations by a given bookId
export async function GET(request: NextRequest): Promise<NextResponse<BookAnnotationsGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return new NextResponse('Book ID is missing', { status: 400 });
    }

    const annotations = await prisma.annotation.findMany({ where: { bookId } });
    return NextResponse.json({ annotations });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
