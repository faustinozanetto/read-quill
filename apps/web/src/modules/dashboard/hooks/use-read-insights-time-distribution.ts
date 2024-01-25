import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadInsightsTimeDistributionGetResponse } from '@modules/api/types/api.types';

interface UseReadInsightsTimeDistributionReturn {
  data: DashboardReadInsightsTimeDistributionGetResponse;
  isFetching: boolean;
}

export const useReadInsightsTimeDistribution = (): UseReadInsightsTimeDistributionReturn => {
  const { data, isFetching } = useQuery<DashboardReadInsightsTimeDistributionGetResponse>(
    ['dashboard-read-time-distribution'],
    {
      initialData: { timeDistribution: [] },
      queryFn: async () => {
        const url = new URL('/api/dashboard/read-insights/time-distribution', __URL__);

        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch user read insights time distribution!');
        }

        return response.json();
      },
    }
  );

  return { data, isFetching };
};
