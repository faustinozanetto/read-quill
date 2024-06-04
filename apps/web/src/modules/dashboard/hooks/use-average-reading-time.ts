import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { AverageReadingTimeGetResponse } from '@modules/api/types/dashboard-api.types';

type UseAverageReadingTimeReturn = Pick<UseQueryResult<AverageReadingTimeGetResponse>, 'data' | 'isLoading'>;

export const useAverageReadingTime = (): UseAverageReadingTimeReturn => {
  const { toast } = useToast();

  const { data, isFetching, isLoading } = useQuery<AverageReadingTimeGetResponse>(['dashboard-average-reading-time'], {
    queryFn: async () => {
      try {
        const url = new URL('/api/dashboard/average-reading-time', __URL__);

        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch average reading time');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetchaverage reading time' });
      }
    },
  });

  return { data, isLoading: isLoading || isFetching };
};
