import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { EditReviewApiActionData } from '../types/review-validations.types';
import { ReviewPatchResponse } from '@modules/api/types/reviews-api.types';

type EditReviewMutationResult = UseMutationResult<ReviewPatchResponse, Error, EditReviewApiActionData>;
type EditReviewMutationParams = UseMutationOptions<ReviewPatchResponse, Error, EditReviewApiActionData>;

interface UseEditReviewReturn {
  editReview: EditReviewMutationResult['mutateAsync'];
}

export interface UseEditReviewParams {
  onSuccess: NonNullable<EditReviewMutationParams['onSuccess']>;
}

export const useEditReview = (params: UseEditReviewParams): UseEditReviewReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ReviewPatchResponse, Error, EditReviewApiActionData>({
    mutationKey: ['edit-review'],
    mutationFn: async (data) => {
      const url = new URL('/api/review', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'PATCH', body });
      const responseData = (await response.json()) as ReviewPatchResponse;

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
    editReview: mutateAsync,
  };
};
