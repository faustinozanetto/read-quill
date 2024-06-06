'use client';

import React from 'react';

import LikeReview from '@modules/review/components/like/like-review';
import { useReviewLikeStatus } from '@modules/review/hooks/likes/use-review-like-status';
import { Skeleton } from '@read-quill/design-system';
import { ReviewLikeDeleteResponse, ReviewLikePostResponse } from '@modules/api/types/reviews-api.types';
import { useToast } from '@read-quill/design-system';
import { useQueryClient } from '@tanstack/react-query';
import { LikeReviewApiActionData } from '@modules/review/types/review-validations.types';
import { useReviewLikeCount } from '@modules/review/hooks/likes/use-review-like-count';

interface UserBookReviewLikeProps {
  reviewId: string;
}

const UserBookReviewLike: React.FC<UserBookReviewLikeProps> = (props) => {
  const { reviewId } = props;

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: reviewLikeCountData, isLoading: isReviewLikeCountLoading } = useReviewLikeCount({ reviewId });

  const { data: reviewLikeStatusData, isLoading: isReviewLikeStatusLoading } = useReviewLikeStatus({ reviewId });

  const onReviewLikeSuccess = async (data: ReviewLikePostResponse, variables: LikeReviewApiActionData) => {
    if (data.data?.reviewLike) {
      await queryClient.refetchQueries({
        queryKey: ['review-like-status', reviewId],
      });
      await queryClient.refetchQueries({
        queryKey: ['review-like-count', reviewId],
      });
      toast({
        variant: 'success',
        content: `Review ${variables.likeType === 'like' ? 'liked' : 'disliked'} successfully!`,
      });
    }
  };

  const onReviewRemoveLikeSuccess = async (data: ReviewLikeDeleteResponse) => {
    if (data.data?.success) {
      await queryClient.refetchQueries({
        queryKey: ['review-like-status', reviewId],
      });
      await queryClient.refetchQueries({
        queryKey: ['review-like-count', reviewId],
      });
      toast({
        variant: 'success',
        content: `Review like removed successfully!`,
      });
    }
  };

  const userAlreadyLikedReview = Boolean(reviewLikeStatusData?.data?.liked);
  const userAlreadyDislikedReview = Boolean(reviewLikeStatusData?.data?.disliked);

  return (
    <div className="ml-auto space-x-2">
      {isReviewLikeStatusLoading ? (
        <Skeleton className="h-10 w-20" />
      ) : (
        <>
          <LikeReview
            likeType="like"
            isActive={userAlreadyLikedReview}
            reviewId={reviewId}
            disabled={isReviewLikeStatusLoading || isReviewLikeCountLoading}
            onSuccess={onReviewLikeSuccess}
            onRemoveSuccess={onReviewRemoveLikeSuccess}
            variant={userAlreadyLikedReview ? 'outline-destructive' : 'outline'}
          >
            {reviewLikeCountData?.data?.likeCount}
          </LikeReview>
          <LikeReview
            likeType="dislike"
            isActive={userAlreadyDislikedReview}
            reviewId={reviewId}
            disabled={isReviewLikeStatusLoading || isReviewLikeCountLoading}
            onSuccess={onReviewLikeSuccess}
            onRemoveSuccess={onReviewRemoveLikeSuccess}
            variant={userAlreadyDislikedReview ? 'outline-destructive' : 'outline'}
          >
            {reviewLikeCountData?.data?.dislikeCount}
          </LikeReview>
        </>
      )}
    </div>
  );
};

export default UserBookReviewLike;
