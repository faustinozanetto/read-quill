import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { EditReviewFormActionData } from '../types/review-validations.types';
import { ReviewPatchResponse } from '@modules/api/types/reviews-api.types';

type EditReviewMutationResult = UseMutationResult<ReviewPatchResponse, Error, EditReviewFormActionData>;
type EditReviewMutationParams = UseMutationOptions<ReviewPatchResponse, Error, EditReviewFormActionData>;

interface UseEditReviewReturn {
  editReview: EditReviewMutationResult['mutateAsync'];
}

export interface UseEditReviewParams {
  reviewId?: string;
  onSuccess: NonNullable<EditReviewMutationParams['onSuccess']>;
}

export const useEditReview = (params: UseEditReviewParams): UseEditReviewReturn => {
  const { reviewId, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ReviewPatchResponse, Error, EditReviewFormActionData>({
    mutationKey: ['edit-review', reviewId],
    mutationFn: async (data) => {
      if (!reviewId) return;

      const url = new URL('/api/review', __URL__);
      const body = JSON.stringify({
        reviewId,
        ...data,
      });

      const response = await fetch(url, { method: 'PATCH', body });
      if (!response.ok) {
        throw new Error('Could not edit review!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    editReview: mutateAsync,
  };
};
