import { useInfiniteQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTargetsHistoryGetResponse } from '@modules/api/types/dashboard-api.types';
import { DashboardReadTargetsType } from '@modules/dashboard/types/dashboard.types';
import { useState } from 'react';

interface UseReadTargetsHistoryReturn
  extends Pick<
    ReturnType<typeof useInfiniteQuery<DashboardReadTargetsHistoryGetResponse | undefined, Error>>,
    'data' | 'fetchNextPage' | 'hasNextPage' | 'isFetchingNextPage' | 'isLoading'
  > {
  interval: DashboardReadTargetsType;
  setInterval: (interval: DashboardReadTargetsType) => void;
}

const buildUrl = (cursor: string | null, pageSize: number, interval: DashboardReadTargetsType): string => {
  const url = new URL('/api/dashboard/read-targets/history', __URL__);
  if (cursor) url.searchParams.set('cursor', cursor);
  url.searchParams.set('pageSize', String(pageSize));
  url.searchParams.set('interval', interval);
  return url.toString();
};

export const useReadTargetsHistory = (): UseReadTargetsHistoryReturn => {
  const { toast } = useToast();

  const [interval, setInterval] = useState<DashboardReadTargetsType>('daily');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery<
    DashboardReadTargetsHistoryGetResponse | undefined
  >({
    queryKey: ['dashboard-read-targets-history', interval],
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.data?.hasMore) return undefined; // Stop fetching if no more pages
      return lastPage.data.nextCursor; // Return the next cursor for the next page
    },
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      try {
        const url = buildUrl(pageParam as string | null, 50, interval);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as DashboardReadTargetsHistoryGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch read targets!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return {
    data,
    isLoading: status === 'pending',
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    interval,
    setInterval,
  };
};
