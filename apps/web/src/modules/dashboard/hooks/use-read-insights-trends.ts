import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadInsightsTrendsGetResponse } from '@modules/api/types/api.types';
import type { DashboardReadInsightsReadTrendsIntervalType } from '../types/dashboard.types';

interface UseReadInsightsTrendsReturn {
  data: DashboardReadInsightsTrendsGetResponse;
  isLoading: boolean;
}

interface UseReadInsightsTrendsParams {
  interval?: DashboardReadInsightsReadTrendsIntervalType;
}

export const useReadInsightsTrends = (params: UseReadInsightsTrendsParams = {}): UseReadInsightsTrendsReturn => {
  const { interval = 'daily' } = params;

  const { data, isLoading } = useQuery<DashboardReadInsightsTrendsGetResponse>(
    ['dashboard-read-insights-trends', interval],
    {
      initialData: { trends: {} },
      queryFn: async () => {
        const url = new URL('/api/dashboard/read-insights/trends', __URL__);
        url.searchParams.set('interval', interval);

        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch user read insights trends!');
        }

        return response.json();
      },
    }
  );
  return { data, isLoading };
};
