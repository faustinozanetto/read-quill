import type { DefinedUseQueryResult, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { BooksNamesGetResponse } from '@modules/api/types/books-api.types';

type UseBooksNamesReturn = Pick<UseQueryResult<BooksNamesGetResponse>, 'data' | 'isLoading'>;

export const useBooksNames = (): UseBooksNamesReturn => {
  const { toast } = useToast();

  const { data, isFetching, isLoading } = useQuery<BooksNamesGetResponse>(['books-names'], {
    queryFn: async () => {
      try {
        const url = new URL('/api/book/names/', __URL__);

        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch user books names');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetch book names!' });
      }
    },
  });

  return { data, isLoading: isLoading || isFetching };
};
