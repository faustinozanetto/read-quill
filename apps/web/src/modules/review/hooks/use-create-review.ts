import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { CreateReviewApiActionData } from '../types/review-validations.types';
import { ReviewPostResponse } from '@modules/api/types/reviews-api.types';

type CreateReviewMutationResult = UseMutationResult<ReviewPostResponse, Error, CreateReviewApiActionData>;
type CreateReviewMutationParams = UseMutationOptions<ReviewPostResponse, Error, CreateReviewApiActionData>;

interface UseCreateReviewReturn {
  createReview: CreateReviewMutationResult['mutateAsync'];
}

export interface UseCreateReviewParams {
  onSuccess: NonNullable<CreateReviewMutationParams['onSuccess']>;
}

export const useCreateReview = (params: UseCreateReviewParams): UseCreateReviewReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ReviewPostResponse, Error, CreateReviewApiActionData>({
    mutationKey: ['create-review'],
    mutationFn: async (data) => {
      const url = new URL('/api/review', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'POST', body });
      const responseData = (await response.json()) as ReviewPostResponse;

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
    createReview: mutateAsync,
  };
};
