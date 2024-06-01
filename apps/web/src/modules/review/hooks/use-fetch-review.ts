import { __URL__ } from '@modules/common/lib/common.constants';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ReviewGetResponse } from '@modules/api/types/reviews-api.types';

interface UseFetchReviewParams {
  reviewId: string;
}

interface UseFetchReviewReturn extends Pick<UseQueryResult<ReviewGetResponse>, 'data' | 'isLoading' | 'isFetching'> {}

export const useFetchReview = (params: UseFetchReviewParams): UseFetchReviewReturn => {
  const { reviewId } = params;

  const { data, isFetching, isLoading } = useQuery<ReviewGetResponse>({
    queryKey: ['review', reviewId],
    queryFn: async () => {
      const url = new URL('/api/review', __URL__);
      url.searchParams.set('reviewId', reviewId);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch review!');
      }

      return response.json();
    },
  });

  return { data, isFetching, isLoading };
};
