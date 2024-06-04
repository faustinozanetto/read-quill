import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTimeDistributionGetResponse } from '@modules/api/types/dashboard-api.types';

type UseReadTimeDistributionReturn = Pick<
  UseQueryResult<DashboardReadTimeDistributionGetResponse>,
  'data' | 'isLoading'
>;

export const useReadsTimeDistribution = (): UseReadTimeDistributionReturn => {
  const { toast } = useToast();

  const { data, isLoading, isFetching } = useQuery<DashboardReadTimeDistributionGetResponse>(
    ['dashboard-read-time-distribution'],
    {
      queryFn: async () => {
        try {
          const url = new URL('/api/dashboard/read-time-distribution', __URL__);
          url.searchParams.set('group-size', '60');

          const response = await fetch(url, { method: 'GET' });
          if (!response.ok) {
            throw new Error('Failed to fetch user read time distribution!');
          }

          return response.json();
        } catch (error) {
          toast({ variant: 'error', content: 'Failed to fetch read time distribution!' });
        }
      },
    }
  );

  return { data, isLoading: isLoading || isFetching };
};
