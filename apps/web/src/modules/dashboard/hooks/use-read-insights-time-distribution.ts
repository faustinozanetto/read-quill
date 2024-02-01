import type { DefinedUseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadInsightsTimeDistributionGetResponse } from '@modules/api/types/dashboard-api.types';

type UseReadInsightsTimeDistributionReturn = Pick<
  DefinedUseQueryResult<DashboardReadInsightsTimeDistributionGetResponse>,
  'data' | 'isLoading' | 'isFetching'
>;

export const useReadInsightsTimeDistribution = (): UseReadInsightsTimeDistributionReturn => {
  const { data, isFetching, isLoading } = useQuery<DashboardReadInsightsTimeDistributionGetResponse>(
    ['dashboard-read-time-distribution'],
    {
      initialData: { timeDistribution: [] },
      queryFn: async () => {
        const url = new URL('/api/dashboard/read-insights/time-distribution', __URL__);
        url.searchParams.set('group-size', '60');

        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch user read insights time distribution!');
        }

        return response.json();
      },
    }
  );

  return { data, isFetching, isLoading };
};
