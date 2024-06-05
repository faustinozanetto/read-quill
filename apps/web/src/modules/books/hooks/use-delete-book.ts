import { BookDeleteResponse } from '@modules/api/types/books-api.types';

import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { DeleteBookApiActionData } from '../types/book-validations.types';

type DeleteBookMutationResult = UseMutationResult<BookDeleteResponse, Error, DeleteBookApiActionData>;
type DeleteBookMutationParams = UseMutationOptions<BookDeleteResponse, Error, DeleteBookApiActionData>;

interface UseDeletBookeReturn {
  deleteBook: DeleteBookMutationResult['mutateAsync'];
  isPending: DeleteBookMutationResult['isPending'];
}

export interface UseDeleteBookParams {
  onSuccess: NonNullable<DeleteBookMutationParams['onSuccess']>;
}

export const useDeleteBook = (params: UseDeleteBookParams): UseDeletBookeReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<BookDeleteResponse, Error, DeleteBookApiActionData>({
    mutationKey: ['delete-book'],
    mutationFn: async (data) => {
      const url = new URL('/api/book', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      const responseData = (await response.json()) as BookDeleteResponse;

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
    deleteBook: mutateAsync,
    isPending,
  };
};
