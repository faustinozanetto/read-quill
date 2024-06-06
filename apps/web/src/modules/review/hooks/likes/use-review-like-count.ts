import { __URL__ } from '@modules/common/lib/common.constants';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import { ReviewLikeCountGetResponse } from '@modules/api/types/reviews-api.types';

interface UseReviewLikeCountParams {
  reviewId: string;
}

interface UseReviewLikeCountReturn
  extends Pick<UseQueryResult<ReviewLikeCountGetResponse | undefined>, 'data' | 'isLoading'> {}

export const useReviewLikeCount = (params: UseReviewLikeCountParams): UseReviewLikeCountReturn => {
  const { reviewId } = params;

  const { user } = useAuthContext();

  const { data, status } = useQuery<ReviewLikeCountGetResponse | undefined>({
    queryKey: ['review-like-count', reviewId],
    enabled: !!user,
    placeholderData: {},
    queryFn: async () => {
      const url = new URL('/api/review/like/count', __URL__);
      url.searchParams.set('reviewId', reviewId);

      const response = await fetch(url, { method: 'GET' });
      const responseData = await response.json();

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
