import { __URL__ } from '@modules/common/lib/common.constants';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ReviewGetResponse } from '@modules/api/types/reviews-api.types';
import { useToast } from '@read-quill/design-system';

interface UseFetchReviewParams {
  reviewId: string;
}

interface UseFetchReviewReturn extends Pick<UseQueryResult<ReviewGetResponse | undefined>, 'data' | 'isLoading'> {}

export const useFetchReview = (params: UseFetchReviewParams): UseFetchReviewReturn => {
  const { reviewId } = params;

  const { toast } = useToast();

  const { data, status } = useQuery<ReviewGetResponse | undefined>({
    queryKey: ['review', reviewId],
    queryFn: async () => {
      try {
        const url = new URL('/api/review', __URL__);
        url.searchParams.set('reviewId', reviewId);

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

  return { data, isLoading: status === 'pending' };
};
