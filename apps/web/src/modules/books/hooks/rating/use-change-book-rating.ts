import { BookRatingPostResponse } from '@modules/api/types/books-api.types';
import { RatingBookApiActionData } from '@modules/books/types/book-validations.types';

import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type ChangeBookRatingMutationResult = UseMutationResult<BookRatingPostResponse, Error, RatingBookApiActionData>;
type ChangeBookRatingMutationParams = UseMutationOptions<BookRatingPostResponse, Error, RatingBookApiActionData>;

interface UseChangeBookRatingReturn {
  changeRating: ChangeBookRatingMutationResult['mutateAsync'];
  isPending: ChangeBookRatingMutationResult['isPending'];
}

interface UseChangeBookRatingParams {
  onSuccess: NonNullable<ChangeBookRatingMutationParams['onSuccess']>;
}

export const useChangeBookRating = (params: UseChangeBookRatingParams): UseChangeBookRatingReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<BookRatingPostResponse, Error, RatingBookApiActionData>({
    mutationKey: ['book-rating-change'],
    mutationFn: async (data) => {
      const url = new URL('/api/book/rating', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'POST', body });
      const responseData = (await response.json()) as BookRatingPostResponse;

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
    changeRating: mutateAsync,
    isPending,
  };
};
