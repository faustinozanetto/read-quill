'use client';

import React from 'react';

import LikeReview from '@modules/review/components/like/like-review';
import { useReviewLikeStatus } from '@modules/review/hooks/likes/use-review-like-status';
import { Skeleton } from '@read-quill/design-system';
import { ReviewLikeDeleteResponse, ReviewLikePostResponse } from '@modules/api/types/reviews-api.types';
import { useToast } from '@read-quill/design-system';
import { useQueryClient } from '@tanstack/react-query';
import { LikeReviewApiActionData, RemoveLikeReviewApiActionData } from '@modules/review/types/review-validations.types';

interface UserBookReviewLikeProps {
  reviewId: string;
}

const UserBookReviewLike: React.FC<UserBookReviewLikeProps> = (props) => {
  const { reviewId } = props;

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: reviewLikeStatusData, isLoading } = useReviewLikeStatus({ reviewId });

  const onReviewLikeSuccess = async (data: ReviewLikePostResponse, variables: LikeReviewApiActionData) => {
    if (data.data?.reviewLike) {
      await queryClient.refetchQueries({
        queryKey: ['review-like-status', reviewId],
      });
      toast({
        variant: 'success',
        content: `Review ${variables.likeType === 'like' ? 'liked' : 'disliked'} successfully!`,
      });
    }
  };

  const onReviewRemoveLikeSuccess = async (
    data: ReviewLikeDeleteResponse,
    variables: RemoveLikeReviewApiActionData
  ) => {
    if (data.data?.success) {
      await queryClient.refetchQueries({
        queryKey: ['review-like-status', reviewId],
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
      {isLoading ? (
        <Skeleton className="h-10 w-20" />
      ) : (
        <>
          <LikeReview
            likeType="like"
            isActive={userAlreadyLikedReview}
            reviewId={reviewId}
            disabled={isLoading}
            onSuccess={onReviewLikeSuccess}
            onRemoveSuccess={onReviewRemoveLikeSuccess}
            variant={userAlreadyLikedReview ? 'outline-destructive' : 'outline'}
          />
          <LikeReview
            likeType="dislike"
            isActive={userAlreadyDislikedReview}
            reviewId={reviewId}
            disabled={isLoading}
            onSuccess={onReviewLikeSuccess}
            onRemoveSuccess={onReviewRemoveLikeSuccess}
            variant={userAlreadyDislikedReview ? 'outline-destructive' : 'outline'}
          />
        </>
      )}
    </div>
  );
};

export default UserBookReviewLike;
