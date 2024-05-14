import type { DefinedUseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadInsightsTrendsGetResponse } from '@modules/api/types/dashboard-api.types';
import type { DashboardReadInsightsReadTrendsIntervalType } from '../types/dashboard.types';
import { useMemo, useState } from 'react';
import { addDays, isWithinInterval, subDays } from 'date-fns';

export interface ReadInsightsTrendsDailyRange {
  from: Date;
  to: Date;
}

interface UseReadInsightsTrendsReturn
  extends Pick<DefinedUseQueryResult<DashboardReadInsightsTrendsGetResponse>, 'data' | 'isLoading' | 'isFetching'> {
  interval: DashboardReadInsightsReadTrendsIntervalType;
  setInterval: (interval: DashboardReadInsightsReadTrendsIntervalType) => void;
  dailyRange: ReadInsightsTrendsDailyRange;
  setDailyRange: (dailyRange: ReadInsightsTrendsDailyRange) => void;
}

export const useReadInsightsTrends = (): UseReadInsightsTrendsReturn => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [dailyRange, setDailyRange] = useState<ReadInsightsTrendsDailyRange>({
    from: subDays(new Date(), 30),
    to: addDays(new Date(), 30),
  });

  const interval = (searchParams.get('read-trends-interval') as DashboardReadInsightsReadTrendsIntervalType) ?? 'daily';

  const { data, isLoading, isFetching } = useQuery<DashboardReadInsightsTrendsGetResponse>(
    ['dashboard-read-insights-trends', interval],
    {
      initialData: { trends: [] },
      queryFn: async () => {
        try {
          const url = new URL('/api/dashboard/read-insights/trends', __URL__);
          url.searchParams.set('interval', interval);

          const response = await fetch(url, { method: 'GET' });
          if (!response.ok) {
            throw new Error('Failed to fetch user read insights trends!');
          }

          return response.json();
        } catch (error) {
          toast({ variant: 'error', content: 'Failed to fetch read trends!' });
        }
      },
    }
  );

  const setInterval = (newInterval: DashboardReadInsightsReadTrendsIntervalType): void => {
    const params = new URLSearchParams(searchParams);
    params.set('read-trends-interval', newInterval);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const computedData = useMemo(() => {
    if (interval !== 'daily') return data;

    const filteredData: DashboardReadInsightsTrendsGetResponse = {
      trends: [],
    };
    filteredData.trends = data.trends.filter((trend) => {
      const date = new Date(trend.date);
      return isWithinInterval(date, { start: dailyRange.from, end: dailyRange.to });
    });

    return filteredData;
  }, [data, dailyRange, interval]);

  return { data: computedData, isLoading, isFetching, interval, setInterval, dailyRange, setDailyRange };
};
