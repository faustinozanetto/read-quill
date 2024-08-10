import { BookInsightsGetResponse } from '@modules/api/types/books-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';

interface UseBookInsightsReturn
  extends Pick<UseQueryResult<BookInsightsGetResponse | undefined>, 'data' | 'isLoading'> {}

interface UseBookInsightsParams {
  bookId?: string;
}

export const useBookInsights = (params: UseBookInsightsParams): UseBookInsightsReturn => {
  const { bookId } = params;

  const { toast } = useToast();

  const { data, status } = useQuery<BookInsightsGetResponse | undefined>({
    queryKey: ['book-insights', bookId],
    queryFn: async () => {
      try {
        if (!bookId) return;

        const url = new URL('/api/book/insights', __URL__);
        url.searchParams.set('bookId', bookId);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as BookInsightsGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch book completion status!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return {
    data,
    isLoading: status === 'pending',
  };
};
