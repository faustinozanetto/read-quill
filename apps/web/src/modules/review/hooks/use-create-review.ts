import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { CreateReviewFormActionData } from '../types/review-validations.types';
import { ReviewPostResponse } from '@modules/api/types/reviews-api.types';

type CreateReviewMutationResult = UseMutationResult<ReviewPostResponse, Error, CreateReviewFormActionData>;
type CreateReviewMutationParams = UseMutationOptions<ReviewPostResponse, Error, CreateReviewFormActionData>;

interface UseCreateReviewReturn {
  createReview: CreateReviewMutationResult['mutateAsync'];
}

export interface UseCreateReviewParams {
  bookId?: string;
  onSuccess: NonNullable<CreateReviewMutationParams['onSuccess']>;
}

export const useCreateReview = (params: UseCreateReviewParams): UseCreateReviewReturn => {
  const { bookId, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ReviewPostResponse, Error, CreateReviewFormActionData>({
    mutationKey: ['create-review', bookId],
    mutationFn: async (data) => {
      if (!bookId) return;

      const url = new URL('/api/review', __URL__);
      const body = JSON.stringify({
        bookId,
        ...data,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not create review!');
      }
      return response.json();
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
