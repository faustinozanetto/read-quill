import React from 'react';
import { UseLikeReviewParams, useLikeReview } from '@modules/review/hooks/likes/use-like-review';
import { LikeReviewType } from '@modules/review/types/review-validations.types';
import {
  Button,
  LoadingIcon,
  ThumbsDownIcon,
  ThumbsDownOffIcon,
  ThumbsUpIcon,
  ThumbsUpOffIcon,
} from '@read-quill/design-system';
import type { ButtonProps } from '@read-quill/design-system';
import { UseRemoveLikeReviewParams, useRemoveLikeReview } from '@modules/review/hooks/likes/use-remove-like-review';

interface LikeReviewProps extends Omit<ButtonProps, 'onClick' | 'aria-label'> {
  reviewId: string;
  isActive: boolean;
  likeType: LikeReviewType;
  onSuccess: UseLikeReviewParams['onSuccess'];
  onRemoveSuccess: UseRemoveLikeReviewParams['onSuccess'];
}

const LikeReview: React.FC<LikeReviewProps> = (props) => {
  const {
    reviewId,
    likeType,
    isActive,
    onSuccess,
    onRemoveSuccess,
    size = 'icon',
    variant = 'outline',
    disabled,
    ...rest
  } = props;

  const { likeReview, isPending: isLikeReviewPending } = useLikeReview({ onSuccess });
  const { removeLikeReview, isPending: isRemoveLikePending } = useRemoveLikeReview({
    onSuccess: onRemoveSuccess,
  });

  const handleLike = async () => {
    if (isActive) await removeLikeReview({ reviewId });
    else await likeReview({ likeType, reviewId });
  };

  return (
    <Button
      aria-label={`${likeType === 'like' ? 'Like' : 'Dislike'} review`}
      size={size}
      variant={variant}
      disabled={isLikeReviewPending || isRemoveLikePending}
      onClick={handleLike}
      {...rest}
    >
      {isLikeReviewPending || isRemoveLikePending ? (
        <LoadingIcon />
      ) : likeType === 'like' ? (
        isActive ? (
          <ThumbsUpOffIcon />
        ) : (
          <ThumbsUpIcon />
        )
      ) : isActive ? (
        <ThumbsDownOffIcon />
      ) : (
        <ThumbsDownIcon />
      )}
    </Button>
  );
};

export default LikeReview;
