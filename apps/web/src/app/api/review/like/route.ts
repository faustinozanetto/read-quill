import {
  ReviewLikeDeleteResponse,
  ReviewLikeGetResponse,
  ReviewLikePostResponse,
} from '@modules/api/types/reviews-api.types';
import { REVIEW_ACTIONS_VALIDATIONS_API } from '@modules/review/validations/reviews.validations';
import { ReviewLike, prisma } from '@read-quill/database';
import { auth } from 'auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// /api/review/like GET : Gets the like of a review
export async function GET(request: NextRequest): Promise<NextResponse<ReviewLikeGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const reviewLikeId = searchParams.get('reviewLikeId');

    if (!reviewLikeId) {
      return NextResponse.json(
        {
          error: {
            message: 'Review Like Id is required!',
          },
        },
        { status: 400 }
      );
    }

    const reviewLike = await prisma.reviewLike.findUnique({
      where: {
        id: reviewLikeId,
      },
    });

    if (!reviewLike) {
      return NextResponse.json(
        {
          error: {
            message: 'Review like not found!',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: { reviewLike } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/rewiew/like POST : Create a like or dislike of a review
export async function POST(request: NextRequest): Promise<NextResponse<ReviewLikePostResponse>> {
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
    const { reviewId, likeType } = REVIEW_ACTIONS_VALIDATIONS_API.LIKE.parse(json);

    const existingLike = await prisma.reviewLike.findFirst({
      where: {
        userId: session.user.id,
        reviewId,
      },
    });

    let reviewLike: ReviewLike | null = null;

    const isLike = likeType === 'like';
    if (existingLike) {
      if (existingLike.isLike === isLike) {
        await prisma.reviewLike.delete({ where: { id: existingLike.id } });
      } else {
        reviewLike = await prisma.reviewLike.update({
          where: { id: existingLike.id },
          data: { isLike },
        });
      }
    } else {
      reviewLike = await prisma.reviewLike.create({
        data: { reviewId, userId: session.user.id, isLike },
      });
    }

    if (!reviewLike) {
      return NextResponse.json(
        {
          error: {
            message: 'Could not create review like!',
          },
        },
        { status: 409 }
      );
    }

    return NextResponse.json({ data: { reviewLike } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/rewiew/like DELETE : Deletes a like or dislike of a review
export async function DELETE(request: NextRequest): Promise<NextResponse<ReviewLikeDeleteResponse>> {
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
    const { reviewId } = REVIEW_ACTIONS_VALIDATIONS_API.DELETE_LIKE.parse(json);

    const reviewLike = await prisma.reviewLike.findFirst({
      where: { reviewId, userId: session.user.id },
    });

    if (!reviewLike) {
      return NextResponse.json(
        {
          error: {
            message: 'Review like not found!',
          },
        },
        { status: 404 }
      );
    }

    await prisma.reviewLike.delete({
      where: {
        id: reviewLike.id,
      },
    });

    return NextResponse.json({
      data: {
        success: true,
      },
    });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
