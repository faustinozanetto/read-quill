import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { AverageReadingTimeGetResponse } from '@modules/api/types/dashboard-api.types';

type UseAverageReadingTimeReturn = Pick<
  UseQueryResult<AverageReadingTimeGetResponse | undefined>,
  'data' | 'isLoading'
>;

export const useAverageReadingTime = (): UseAverageReadingTimeReturn => {
  const { toast } = useToast();

  const { data, status } = useQuery<AverageReadingTimeGetResponse | undefined>({
    queryKey: ['dashboard-average-reading-time'],
    queryFn: async () => {
      try {
        const url = new URL('/api/dashboard/average-reading-time', __URL__);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as AverageReadingTimeGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch average reading times!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: status === 'pending' };
};
