import { BookFavouritePostResponse } from '@modules/api/types/books-api.types';

import { __URL__ } from '@modules/common/lib/common.constants';
import { Book } from '@read-quill/database';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type ChangeBookFavouriteMutationResult = UseMutationResult<BookFavouritePostResponse, Error, void>;
type ChangeBookFavouriteMutationParams = UseMutationOptions<BookFavouritePostResponse, Error, void>;

interface UseChangeBookFavouriteReturn {
  changeFavourite: ChangeBookFavouriteMutationResult['mutateAsync'];
  isLoading: ChangeBookFavouriteMutationResult['isLoading'];
}

interface UseChangeBookFavouriteParams {
  book: Book | null;
  onSuccess: NonNullable<ChangeBookFavouriteMutationParams['onSuccess']>;
}

export const useChangeBookFavourite = (params: UseChangeBookFavouriteParams): UseChangeBookFavouriteReturn => {
  const { book, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isLoading } = useMutation<BookFavouritePostResponse, Error, void>({
    mutationKey: ['book-favourite-change', book?.id],
    mutationFn: async () => {
      if (!book) return;

      const url = new URL('/api/book/favourite', __URL__);
      const body = JSON.stringify({
        bookId: book.id,
        isFavourite: !book.isFavourite,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not update book favourite!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    changeFavourite: mutateAsync,
    isLoading,
  };
};
