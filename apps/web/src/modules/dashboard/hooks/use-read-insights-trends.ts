import { useQuery } from '@tanstack/react-query';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadInsightsTrendsGetResponse } from '@modules/api/types/dashboard-api.types';
import type { DashboardReadInsightsReadTrendsIntervalType } from '../types/dashboard.types';

interface UseReadInsightsTrendsReturn {
  data: DashboardReadInsightsTrendsGetResponse;
  isFetching: boolean;
  isLoading: boolean;
  interval: DashboardReadInsightsReadTrendsIntervalType;
  setInterval: (interval: DashboardReadInsightsReadTrendsIntervalType) => void;
}

export const useReadInsightsTrends = (): UseReadInsightsTrendsReturn => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const interval = (searchParams.get('read-trends-interval') as DashboardReadInsightsReadTrendsIntervalType) ?? 'daily';

  const { data, isLoading, isFetching } = useQuery<DashboardReadInsightsTrendsGetResponse>(
    ['dashboard-read-insights-trends', interval],
    {
      initialData: { trends: [] },
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

  const setInterval = (newInterval: DashboardReadInsightsReadTrendsIntervalType): void => {
    const params = new URLSearchParams(searchParams);
    params.set('read-trends-interval', newInterval);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { data, isLoading, isFetching, interval, setInterval };
};
