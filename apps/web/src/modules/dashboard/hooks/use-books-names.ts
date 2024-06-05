import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { BooksNamesGetResponse } from '@modules/api/types/books-api.types';

type UseBooksNamesReturn = Pick<UseQueryResult<BooksNamesGetResponse | undefined>, 'data' | 'isLoading'>;

export const useBooksNames = (): UseBooksNamesReturn => {
  const { toast } = useToast();

  const { data, isFetching, isLoading } = useQuery<BooksNamesGetResponse | undefined>({
    queryKey: ['books-names'],
    initialData: {
      data: { booksNames: [] },
    },
    queryFn: async () => {
      try {
        const url = new URL('/api/book/names/', __URL__);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as BooksNamesGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch book names!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: isLoading || isFetching };
};
