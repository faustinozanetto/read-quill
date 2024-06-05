import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardBooksRatingsGetResponse } from '@modules/api/types/dashboard-api.types';

type UseBooksRatingsReturn = Pick<UseQueryResult<DashboardBooksRatingsGetResponse | undefined>, 'data' | 'isLoading'>;

export const useBooksRatings = (): UseBooksRatingsReturn => {
  const { toast } = useToast();

  const { data, status } = useQuery<DashboardBooksRatingsGetResponse | undefined>({
    queryKey: ['dashboard-books-ratings'],
    queryFn: async () => {
      try {
        const url = new URL('/api/dashboard/books-ratings', __URL__);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as DashboardBooksRatingsGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch book ratings!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: status === 'pending' };
};
