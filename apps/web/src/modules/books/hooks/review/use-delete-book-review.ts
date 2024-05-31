import { BookReviewDeleteResponse } from '@modules/api/types/books-api.types';
import { BookWithDetails } from '@modules/books/types/book.types';

import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type DeleteBookReviewMutationResult = UseMutationResult<BookReviewDeleteResponse, Error, void>;
type DeleteBookReviewMutationParams = UseMutationOptions<BookReviewDeleteResponse, Error, void>;

interface UseDeleteBookReviewReturn {
  deleteReview: DeleteBookReviewMutationResult['mutateAsync'];
}

interface UseDeleteBookReviewParams {
  book: BookWithDetails | null;
  onSuccess: NonNullable<DeleteBookReviewMutationParams['onSuccess']>;
}

export const useDeleteBookReview = (params: UseDeleteBookReviewParams): UseDeleteBookReviewReturn => {
  const { book, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<BookReviewDeleteResponse, Error, void>({
    mutationKey: ['book-review-delete', book?.id],
    mutationFn: async () => {
      if (!book) return;

      const url = new URL('/api/books/review', __URL__);
      const body = JSON.stringify({
        bookId: book.id,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      if (!response.ok) {
        throw new Error('Could not delete book review!');
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
