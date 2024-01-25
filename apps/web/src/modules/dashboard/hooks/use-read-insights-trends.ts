import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadInsightsTrendsGetResponse } from '@modules/api/types/api.types';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import type { DashboardReadInsightsReadTrendsIntervalType } from '../types/dashboard.types';

interface UseReadInsightsTrendsReturn {
  data: DashboardReadInsightsTrendsGetResponse;
  isFetching: boolean;
  interval: DashboardReadInsightsReadTrendsIntervalType;
  setInterval: (interval: DashboardReadInsightsReadTrendsIntervalType) => void;
}

export const useReadInsightsTrends = (): UseReadInsightsTrendsReturn => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const interval = (searchParams.get('read-trends-interval') as DashboardReadInsightsReadTrendsIntervalType) ?? 'daily';

  const { data, isFetching } = useQuery<DashboardReadInsightsTrendsGetResponse>(
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

  const setInterval = (newInterval: DashboardReadInsightsReadTrendsIntervalType): void => {
    const params = new URLSearchParams(searchParams);
    params.set('read-trends-interval', newInterval);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { data, isFetching, interval, setInterval };
};