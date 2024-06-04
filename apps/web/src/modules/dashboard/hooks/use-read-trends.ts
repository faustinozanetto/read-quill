import type { DefinedUseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';

import { useMemo, useState } from 'react';
import { addDays, isWithinInterval, subDays } from 'date-fns';
import { DashboardReadTrendsGetResponse } from '@modules/api/types/dashboard-api.types';
import { DashboardReadTrendsIntervalType } from '../types/dashboard.types';

export interface ReadTrendsDailyRange {
  from: Date;
  to: Date;
}

interface UseReadsTrendsReturn
  extends Pick<DefinedUseQueryResult<DashboardReadTrendsGetResponse>, 'isLoading' | 'isFetching'> {
  data: DashboardReadTrendsGetResponse;
  filteredData: DashboardReadTrendsGetResponse;
  interval: DashboardReadTrendsIntervalType;
  setInterval: (interval: DashboardReadTrendsIntervalType) => void;
  dailyRange: ReadTrendsDailyRange;
  setDailyRange: (dailyRange: ReadTrendsDailyRange) => void;
}

export const useReadsTrends = (): UseReadsTrendsReturn => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [dailyRange, setDailyRange] = useState<ReadTrendsDailyRange>({
    from: subDays(new Date(), 30),
    to: addDays(new Date(), 30),
  });

  const interval = (searchParams.get('read-trends-interval') as DashboardReadTrendsIntervalType) ?? 'daily';

  const { data, isLoading, isFetching } = useQuery<DashboardReadTrendsGetResponse>(
    ['dashboard-read-insights-trends', interval],
    {
      initialData: { trends: [] },
      queryFn: async () => {
        try {
          const url = new URL('/api/dashboard/read-trends', __URL__);
          url.searchParams.set('interval', interval);

          const response = await fetch(url, { method: 'GET' });
          if (!response.ok) {
            throw new Error('Failed to fetch user read trends!');
          }

          return response.json();
        } catch (error) {
          toast({ variant: 'error', content: 'Failed to fetch read trends!' });
        }
      },
    }
  );

  const setInterval = (newInterval: DashboardReadTrendsIntervalType): void => {
    const params = new URLSearchParams(searchParams);
    params.set('read-trends-interval', newInterval);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredData = useMemo(() => {
    if (interval !== 'daily') return data;

    const filteredData: DashboardReadTrendsGetResponse = {
      trends: [],
    };
    filteredData.trends = data.trends.filter((trend) => {
      const date = new Date(trend.date);
      return isWithinInterval(date, { start: dailyRange.from, end: dailyRange.to });
    });

    return filteredData;
  }, [data, dailyRange, interval]);

  return { data, filteredData, isLoading, isFetching, interval, setInterval, dailyRange, setDailyRange };
};
