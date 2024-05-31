import { BookDeleteResponse } from '@modules/api/types/books-api.types';

import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { BookWithDetails } from '../types/book.types';

type DeleteBookMutationResult = UseMutationResult<BookDeleteResponse, Error, void>;
type DeleteBookMutationParams = UseMutationOptions<BookDeleteResponse, Error, void>;

interface UseDeletBookeReturn {
  deleteBook: DeleteBookMutationResult['mutateAsync'];
}

interface UseDeleteBookParams {
  book: BookWithDetails | null;
  onSuccess: NonNullable<DeleteBookMutationParams['onSuccess']>;
}

export const useDeleteBook = (params: UseDeleteBookParams): UseDeletBookeReturn => {
  const { book, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<BookDeleteResponse, Error, void>({
    mutationKey: ['book-delete', book?.id],
    mutationFn: async () => {
      if (!book) return;

      const url = new URL('/api/books', __URL__);
      const body = JSON.stringify({
        bookId: book.id,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      if (!response.ok) {
        throw new Error('Could not delete book!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    deleteBook: mutateAsync,
  };
};
