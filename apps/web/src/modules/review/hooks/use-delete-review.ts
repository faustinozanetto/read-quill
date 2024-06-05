import { ReviewDeleteResponse } from '@modules/api/types/reviews-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { DeleteReviewApiActionData } from '../types/review-validations.types';

type DeleteReviewMutationResult = UseMutationResult<ReviewDeleteResponse, Error, DeleteReviewApiActionData>;
type DeleteReviewMutationParams = UseMutationOptions<ReviewDeleteResponse, Error, DeleteReviewApiActionData>;

interface UseDeleteReviewReturn {
  deleteReview: DeleteReviewMutationResult['mutateAsync'];
}

export interface UseDeleteReviewParams {
  onSuccess: NonNullable<DeleteReviewMutationParams['onSuccess']>;
}

export const useDeleteReview = (params: UseDeleteReviewParams): UseDeleteReviewReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ReviewDeleteResponse, Error, DeleteReviewApiActionData>({
    mutationKey: ['delete-review'],
    mutationFn: async (data) => {
      const url = new URL('/api/review', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      const responseData = (await response.json()) as ReviewDeleteResponse;

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
    deleteReview: mutateAsync,
  };
};
