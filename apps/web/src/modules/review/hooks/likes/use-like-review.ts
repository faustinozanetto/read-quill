import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { LikeReviewApiActionData } from '../../types/review-validations.types';
import { ReviewLikePostResponse } from '@modules/api/types/reviews-api.types';

type LikeReviewMutationResult = UseMutationResult<ReviewLikePostResponse, Error, LikeReviewApiActionData>;
type LikeReviewMutationParams = UseMutationOptions<ReviewLikePostResponse, Error, LikeReviewApiActionData>;

interface UseLikeReviewReturn {
  likeReview: LikeReviewMutationResult['mutateAsync'];
  isPending: LikeReviewMutationResult['isPending'];
}

export interface UseLikeReviewParams {
  onSuccess: NonNullable<LikeReviewMutationParams['onSuccess']>;
}

export const useLikeReview = (params: UseLikeReviewParams): UseLikeReviewReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<ReviewLikePostResponse, Error, LikeReviewApiActionData>({
    mutationKey: ['like-review'],
    mutationFn: async (data) => {
      const url = new URL('/api/review/like', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'POST', body });
      const responseData = (await response.json()) as ReviewLikePostResponse;

      if (!response.ok) {
        let errorMessage = response.statusText;
        if (responseData.error) errorMessage = responseData.error.message;

        throw new Error(errorMessage);
      }

      return responseData;
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    likeReview: mutateAsync,
    isPending,
  };
};
