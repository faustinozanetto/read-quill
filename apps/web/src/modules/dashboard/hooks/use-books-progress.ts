import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardBooksProgress } from '../types/dashboard.types';

interface UseBooksProgressReturn {
  booksProgress: DashboardBooksProgress;
  isLoading: boolean;
}

export const useBooksProgress = (): UseBooksProgressReturn => {
  const { data, isLoading } = useQuery<UseBooksProgressReturn['booksProgress']>(['dashboard-books-progress'], {
    queryFn: async () => {
      const url = new URL('/api/dashboard/books-progress', __URL__);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch user books progress!');
      }

      const { booksProgress } = await response.json();
      return booksProgress;
    },
  });
  return { booksProgress: data ?? {}, isLoading };
};
