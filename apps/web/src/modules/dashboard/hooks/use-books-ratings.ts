import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardBooksRatingsGetResponse } from '@modules/api/types/dashboard-api.types';

interface UseBooksRatingsReturn {
  data: DashboardBooksRatingsGetResponse;
  isFetching: boolean;
  isLoading: boolean;
}

export const useBooksRatings = (): UseBooksRatingsReturn => {
  const { data, isFetching, isLoading } = useQuery<DashboardBooksRatingsGetResponse>(['dashboard-books-ratings'], {
    initialData: { booksRatings: [] },
    queryFn: async () => {
      const url = new URL('/api/dashboard/books-ratings', __URL__);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch user books ratings');
      }

      return response.json();
    },
  });

  return { data, isFetching, isLoading };
};