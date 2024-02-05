import type { DefinedUseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardBooksRatingsGetResponse } from '@modules/api/types/dashboard-api.types';

type UseBooksRatingsReturn = Pick<
  DefinedUseQueryResult<DashboardBooksRatingsGetResponse>,
  'data' | 'isLoading' | 'isFetching'
>;

export const useBooksRatings = (): UseBooksRatingsReturn => {
  const { toast } = useToast();

  const { data, isFetching, isLoading } = useQuery<DashboardBooksRatingsGetResponse>(['dashboard-books-ratings'], {
    initialData: { booksRatings: [] },
    queryFn: async () => {
      try {
        const url = new URL('/api/dashboard/books-ratings', __URL__);

        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch user books ratings');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetch books ratings!' });
      }
    },
  });

  return { data, isFetching, isLoading };
};
