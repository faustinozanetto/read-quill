import { ReviewLikeStatusGetResponse } from '@modules/api/types/reviews-api.types';
import { prisma } from '@read-quill/database';
import { auth } from 'auth';

import { NextRequest, NextResponse } from 'next/server';

// /api/review/like/status GET : Gets the status like of a review
export async function GET(request: NextRequest): Promise<NextResponse<ReviewLikeStatusGetResponse>> {
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

    const reviewLikes = await prisma.reviewLike.findMany({
      where: {
        userId: session.user.id,
        reviewId,
      },
    });

    const likedReview = reviewLikes.find((like) => like.isLike) !== undefined;
    const dislikedReview = reviewLikes.find((like) => !like.isLike) !== undefined;

    return NextResponse.json({ data: { liked: likedReview, disliked: dislikedReview } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
