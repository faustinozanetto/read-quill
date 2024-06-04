import { __URL__ } from '@modules/common/lib/common.constants';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ReviewGetResponse } from '@modules/api/types/reviews-api.types';

interface UseFetchReviewFromBookParams {
  bookId?: string;
}

interface UseFetchReviewFromBookReturn extends Pick<UseQueryResult<ReviewGetResponse>, 'data' | 'isLoading'> {}

export const useFetchReviewFromBook = (params: UseFetchReviewFromBookParams): UseFetchReviewFromBookReturn => {
  const { bookId } = params;

  const { data, isFetching, isLoading } = useQuery<ReviewGetResponse>({
    queryKey: ['review-from-book', bookId],
    enabled: !!bookId,
    queryFn: async () => {
      if (!bookId) return;

      const url = new URL('/api/review/from-book', __URL__);
      url.searchParams.set('bookId', bookId);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch review!');
      }

      return response.json();
    },
  });

  return { data, isLoading: isLoading || isFetching };
};
