import { __URL__ } from '@modules/common/lib/common.constants';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { ReviewLikeStatusGetResponse } from '@modules/api/types/reviews-api.types';

interface UseReviewLikeStatusParams {
  reviewId: string;
}

interface UseReviewLikeStatusReturn
  extends Pick<UseQueryResult<ReviewLikeStatusGetResponse | undefined>, 'data' | 'isLoading'> {}

export const useReviewLikeStatus = (params: UseReviewLikeStatusParams): UseReviewLikeStatusReturn => {
  const { reviewId } = params;

  const { data, status } = useQuery<ReviewLikeStatusGetResponse | undefined>({
    queryKey: ['review-like-status', reviewId],
    queryFn: async () => {
      const url = new URL('/api/review/like/status', __URL__);
      url.searchParams.set('reviewId', reviewId);

      const response = await fetch(url, { method: 'GET' });
      const responseData = (await response.json()) as ReviewLikeStatusGetResponse;

      if (!response.ok) {
        let errorMessage = response.statusText;
        if (responseData.error) errorMessage = responseData.error.message;

        throw new Error(errorMessage);
      }

      return responseData;
    },
  });

  return { data, isLoading: status === 'pending' };
};
