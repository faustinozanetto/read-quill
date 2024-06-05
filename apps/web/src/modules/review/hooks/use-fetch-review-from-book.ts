import { __URL__ } from '@modules/common/lib/common.constants';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ReviewGetResponse } from '@modules/api/types/reviews-api.types';
import { useToast } from '@read-quill/design-system';

interface UseFetchReviewFromBookParams {
  bookId?: string;
}

interface UseFetchReviewFromBookReturn
  extends Pick<UseQueryResult<ReviewGetResponse | undefined>, 'data' | 'isLoading'> {}

export const useFetchReviewFromBook = (params: UseFetchReviewFromBookParams): UseFetchReviewFromBookReturn => {
  const { bookId } = params;

  const { toast } = useToast();

  const { data, isFetching, isLoading } = useQuery<ReviewGetResponse | undefined>({
    queryKey: ['review-from-book', bookId],
    enabled: !!bookId,
    queryFn: async () => {
      try {
        if (!bookId) return;

        const url = new URL('/api/review/from-book', __URL__);
        url.searchParams.set('bookId', bookId);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as ReviewGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch book review!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: isLoading || isFetching };
};
