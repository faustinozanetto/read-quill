import { ReviewDeleteResponse } from '@modules/api/types/reviews-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type DeleteReviewMutationResult = UseMutationResult<ReviewDeleteResponse, Error, { reviewId: string }>;
type DeleteReviewMutationParams = UseMutationOptions<ReviewDeleteResponse, Error, { reviewId: string }>;

interface UseDeleteReviewReturn {
  deleteReview: DeleteReviewMutationResult['mutateAsync'];
}

export interface UseDeleteReviewParams {
  onSuccess: NonNullable<DeleteReviewMutationParams['onSuccess']>;
}

export const useDeleteReview = (params: UseDeleteReviewParams): UseDeleteReviewReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ReviewDeleteResponse, Error, { reviewId: string }>({
    mutationKey: ['delete-review'],
    mutationFn: async (data) => {
      const url = new URL('/api/review', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      if (!response.ok) {
        throw new Error('Could not delete review!');
      }

      return response.json();
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
