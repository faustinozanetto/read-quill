import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from 'auth';

import {
  ReviewDeleteResponse,
  ReviewGetResponse,
  ReviewPatchResponse,
  ReviewPostResponse,
} from '@modules/api/types/reviews-api.types';
import { REVIEW_ACTIONS_VALIDATIONS_API } from '@modules/review/validations/reviews.validations';

// /api/review GET : Gets a review by a given reviewId
export async function GET(request: NextRequest): Promise<NextResponse<ReviewGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get('reviewId');

    if (!reviewId) {
      return NextResponse.json(
        {
          error: {
            message: 'Review Id is required!',
          },
        },
        { status: 400 }
      );
    }

    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) {
      return NextResponse.json(
        {
          error: {
            message: 'Review not found!',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: { review } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/rewiew POST : Creates a book review
export async function POST(request: NextRequest): Promise<NextResponse<ReviewPostResponse>> {
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
    const { bookId, content } = REVIEW_ACTIONS_VALIDATIONS_API.CREATE.parse(json);

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return NextResponse.json(
        {
          error: {
            message: 'Book not found!',
          },
        },
        { status: 404 }
      );
    }

    const isBookOwner = book.readerId === session.user.id;
    if (!isBookOwner) {
      return NextResponse.json(
        {
          error: {
            message: 'You are not the book owner!',
          },
        },
        { status: 403 }
      );
    }

    const review = await prisma.review.create({
      data: {
        content,
        bookId,
      },
    });

    return NextResponse.json({ data: { review } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/rewiew PATCH : Update a book review
export async function PATCH(request: NextRequest): Promise<NextResponse<ReviewPatchResponse>> {
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
    const { reviewId, content } = REVIEW_ACTIONS_VALIDATIONS_API.EDIT.parse(json);

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        book: {
          select: {
            readerId: true,
          },
        },
      },
    });

    if (!review) {
      return NextResponse.json(
        {
          error: {
            message: 'Review not found!',
          },
        },
        { status: 404 }
      );
    }

    const isReviewOwner = review.book.readerId === session.user.id;
    if (!isReviewOwner) {
      return NextResponse.json(
        {
          error: {
            message: 'You are not the book owner!',
          },
        },
        { status: 403 }
      );
    }

    const updatedReview = await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        content,
      },
    });

    return NextResponse.json({ data: { review: updatedReview } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/book/rewiew DELETE : Delete a book review
export async function DELETE(request: NextRequest): Promise<NextResponse<ReviewDeleteResponse>> {
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
    const { reviewId } = REVIEW_ACTIONS_VALIDATIONS_API.DELETE.parse(json);

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        book: {
          select: {
            readerId: true,
          },
        },
      },
    });

    if (!review) {
      return NextResponse.json(
        {
          error: {
            message: 'Review not found!',
          },
        },
        { status: 404 }
      );
    }

    const isReviewOwner = review.book.readerId === session.user.id;
    if (!isReviewOwner) {
      return NextResponse.json(
        {
          error: {
            message: 'You are not the book owner!',
          },
        },
        { status: 403 }
      );
    }

    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
