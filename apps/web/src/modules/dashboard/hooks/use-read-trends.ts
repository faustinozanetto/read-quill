import type { DefinedUseQueryResult, UseQueryResult } from '@tanstack/react-query';
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
  extends Pick<UseQueryResult<DashboardReadTrendsGetResponse | undefined>, 'data' | 'isLoading'> {
  filteredData: DashboardReadTrendsGetResponse | undefined;
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

  const { data, status } = useQuery<DashboardReadTrendsGetResponse | undefined>({
    queryKey: ['dashboard-read-insights-trends', interval],
    queryFn: async () => {
      try {
        const url = new URL('/api/dashboard/read-trends', __URL__);
        url.searchParams.set('interval', interval);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as DashboardReadTrendsGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch read trends!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  const setInterval = (newInterval: DashboardReadTrendsIntervalType): void => {
    const params = new URLSearchParams(searchParams);
    params.set('read-trends-interval', newInterval);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredData: DashboardReadTrendsGetResponse | undefined = useMemo(() => {
    if (!data?.data) return undefined;
    if (interval !== 'daily') return data;

    const filteredData: DashboardReadTrendsGetResponse['data'] = {
      trends: [],
    };
    filteredData.trends = data.data.trends.filter((trend) => {
      const date = new Date(trend.date);
      return isWithinInterval(date, { start: dailyRange.from, end: dailyRange.to });
    });

    return {
      data: filteredData,
    };
  }, [data, dailyRange, interval]);

  return { data, filteredData, isLoading: status === 'pending', interval, setInterval, dailyRange, setDailyRange };
};
