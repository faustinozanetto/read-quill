import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import { BookReadActivityGetResponse } from '@modules/api/types/books-api.types';

type UseReadActivityReturn = Pick<UseQueryResult<BookReadActivityGetResponse | undefined>, 'data' | 'isLoading'>;

interface UseBookReadActivityParams {
  bookId?: string;
}

const buildUrl = (bookId: string): string => {
  const url = new URL('/api/book/read-activity', __URL__);
  url.searchParams.set('bookId', bookId);
  return url.toString();
};

export const useReadActivity = (params: UseBookReadActivityParams): UseReadActivityReturn => {
  const { bookId } = params;
  const { toast } = useToast();

  const { data, status } = useQuery<BookReadActivityGetResponse | undefined>({
    queryKey: ['book-read-activity'],
    queryFn: async () => {
      try {
        if (!bookId) return;

        const url = buildUrl(bookId);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as BookReadActivityGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch read activity!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: status === 'pending' };
};
