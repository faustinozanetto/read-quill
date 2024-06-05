import { BookFavouritePostResponse } from '@modules/api/types/books-api.types';
import { FavouriteBookApiActionData } from '@modules/books/types/book-validations.types';

import { __URL__ } from '@modules/common/lib/common.constants';

import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

type ChangeBookFavouriteMutationResult = UseMutationResult<
  BookFavouritePostResponse,
  Error,
  FavouriteBookApiActionData
>;
type ChangeBookFavouriteMutationParams = UseMutationOptions<
  BookFavouritePostResponse,
  Error,
  FavouriteBookApiActionData
>;

interface UseChangeBookFavouriteReturn {
  changeFavourite: ChangeBookFavouriteMutationResult['mutateAsync'];
  isPending: ChangeBookFavouriteMutationResult['isPending'];
}

interface UseChangeBookFavouriteParams {
  onSuccess: NonNullable<ChangeBookFavouriteMutationParams['onSuccess']>;
}

export const useChangeBookFavourite = (params: UseChangeBookFavouriteParams): UseChangeBookFavouriteReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isPending } = useMutation<BookFavouritePostResponse, Error, FavouriteBookApiActionData>({
    mutationKey: ['book-favourite-change'],
    mutationFn: async (data) => {
      const url = new URL('/api/book/favourite', __URL__);
      const body = JSON.stringify({
        bookId: data.bookId,
        isFavourite: !data.isFavourite,
      });

      const response = await fetch(url, { method: 'POST', body });
      const responseData = (await response.json()) as BookFavouritePostResponse;

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
    changeFavourite: mutateAsync,
    isPending,
  };
};
