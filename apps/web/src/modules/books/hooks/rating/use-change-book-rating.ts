import { BookRatingPostResponse } from '@modules/api/types/books-api.types';

import { __URL__ } from '@modules/common/lib/common.constants';
import { Book } from '@read-quill/database';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type ChangeBookRatingMutationResult = UseMutationResult<BookRatingPostResponse, Error, { rating: number }>;
type ChangeBookRatingMutationParams = UseMutationOptions<BookRatingPostResponse, Error, { rating: number }>;

interface UseChangeBookRatingReturn {
  changeRating: ChangeBookRatingMutationResult['mutateAsync'];
  isLoading: ChangeBookRatingMutationResult['isLoading'];
}

interface UseChangeBookRatingParams {
  book: Book | null;
  onSuccess: NonNullable<ChangeBookRatingMutationParams['onSuccess']>;
}

export const useChangeBookRating = (params: UseChangeBookRatingParams): UseChangeBookRatingReturn => {
  const { book, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isLoading } = useMutation<BookRatingPostResponse, Error, { rating: number }>({
    mutationKey: ['book-rating-change', book?.id],
    mutationFn: async (data) => {
      if (!book) return;

      const url = new URL('/api/book/rating', __URL__);
      const body = JSON.stringify({
        bookId: book.id,
        rating: data.rating,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not updated book rating!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    changeRating: mutateAsync,
    isLoading,
  };
};
