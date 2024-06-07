import React, { ReactNode, useEffect } from 'react';
import { UseLikeReviewParams, useLikeReview } from '@modules/review/hooks/likes/use-like-review';
import { LikeReviewType } from '@modules/review/types/review-validations.types';
import {
  Button,
  LoadingIcon,
  ThumbsDownIcon,
  ThumbsDownOffIcon,
  ThumbsUpIcon,
  ThumbsUpOffIcon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from '@read-quill/design-system';
import type { ButtonProps } from '@read-quill/design-system';
import { UseRemoveLikeReviewParams, useRemoveLikeReview } from '@modules/review/hooks/likes/use-remove-like-review';
import { useReviewLikeStore } from '@modules/review/state/review-like.slice';

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
    className,
    size = 'sm',
    variant = 'outline',
    disabled,
    children,
    ...rest
  } = props;

  const { setIsLikePending, isLikePending } = useReviewLikeStore();

  const { likeReview, isPending: isLikeReviewPending } = useLikeReview({ onSuccess });
  const { removeLikeReview, isPending: isRemoveLikePending } = useRemoveLikeReview({
    onSuccess: onRemoveSuccess,
  });

  const handleLike = async () => {
    if (isActive) await removeLikeReview({ reviewId });
    else await likeReview({ likeType, reviewId });
  };

  useEffect(() => {
    setIsLikePending(isLikeReviewPending);
  }, [isLikeReviewPending]);

  const label = isActive ? `Remove ${likeType}` : `${likeType === 'like' ? 'Like' : 'Dislike'} review`;

  const disableButton = isLikeReviewPending || isRemoveLikePending || isLikePending;

  const isCurrentLoading = isLikeReviewPending || isRemoveLikePending;

  const stateIcons: Record<LikeReviewType, { isActive: ReactNode; isNotActive: ReactNode }> = {
    like: {
      isActive: <ThumbsUpOffIcon />,
      isNotActive: <ThumbsUpIcon />,
    },
    dislike: {
      isActive: <ThumbsDownOffIcon />,
      isNotActive: <ThumbsDownIcon />,
    },
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label={label}
            className={cn('gap-2', className)}
            variant={variant}
            size={size}
            disabled={disableButton}
            onClick={handleLike}
            {...rest}
          >
            {isCurrentLoading ? (
              <LoadingIcon />
            ) : isActive ? (
              stateIcons[likeType].isActive
            ) : (
              stateIcons[likeType].isNotActive
            )}
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LikeReview;
