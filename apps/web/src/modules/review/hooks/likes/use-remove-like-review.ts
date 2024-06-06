import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { ReviewLikeDeleteResponse } from '@modules/api/types/reviews-api.types';
import { RemoveLikeReviewApiActionData } from '@modules/review/types/review-validations.types';

type RemoveLikeReviewMutationResult = UseMutationResult<ReviewLikeDeleteResponse, Error, RemoveLikeReviewApiActionData>;
type RemoveLikeReviewMutationParams = UseMutationOptions<
  ReviewLikeDeleteResponse,
  Error,
  RemoveLikeReviewApiActionData
>;

interface UseRemoveLikeReviewReturn {
  removeLikeReview: RemoveLikeReviewMutationResult['mutateAsync'];
  isPending: RemoveLikeReviewMutationResult['isPending'];
}

export interface UseRemoveLikeReviewParams {
  onSuccess: NonNullable<RemoveLikeReviewMutationParams['onSuccess']>;
}

export const useRemoveLikeReview = (params: UseRemoveLikeReviewParams): UseRemoveLikeReviewReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<ReviewLikeDeleteResponse, Error, RemoveLikeReviewApiActionData>({
    mutationKey: ['remove-like-review'],
    mutationFn: async (data) => {
      const url = new URL('/api/review/like', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      const responseData = (await response.json()) as ReviewLikeDeleteResponse;

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
    removeLikeReview: mutateAsync,
    isPending,
  };
};
