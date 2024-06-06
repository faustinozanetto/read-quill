import { ReviewLikeCountGetResponse } from '@modules/api/types/reviews-api.types';
import { prisma } from '@read-quill/database';

import { NextRequest, NextResponse } from 'next/server';

// /api/review/like/count GET : Gets the likes of a review
export async function GET(request: NextRequest): Promise<NextResponse<ReviewLikeCountGetResponse>> {
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

    const reviewLikes = await prisma.reviewLike.groupBy({
      by: ['isLike'],
      where: {
        reviewId,
      },
      _count: { _all: true },
    });

    const likeCount = reviewLikes.find((item) => item.isLike === true)?._count._all || 0;
    const dislikeCount = reviewLikes.find((item) => item.isLike === false)?._count._all || 0;

    return NextResponse.json({ data: { likeCount, dislikeCount } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
