import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ReviewGetResponse } from '@modules/api/types/reviews-api.types';

// /api/review/from-book GET : Gets a review by a given bookId
export async function GET(request: NextRequest): Promise<NextResponse<ReviewGetResponse>> {
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

    const review = await prisma.review.findUnique({ where: { bookId } });

    return NextResponse.json({ data: { review } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
