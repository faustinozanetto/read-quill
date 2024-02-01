import type { DefinedUseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { BooksNamesGetResponse } from '@modules/api/types/books-api.types';

type UseBooksNamesReturn = Pick<DefinedUseQueryResult<BooksNamesGetResponse>, 'data' | 'isLoading' | 'isFetching'>;

export const useBooksNames = (): UseBooksNamesReturn => {
  const { data, isFetching, isLoading } = useQuery<BooksNamesGetResponse>(['books-names'], {
    initialData: { booksNames: [] },
    queryFn: async () => {
      const url = new URL('/api/books/names/', __URL__);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch user books names');
      }

      return response.json();
    },
  });

  return { data, isFetching, isLoading };
};
