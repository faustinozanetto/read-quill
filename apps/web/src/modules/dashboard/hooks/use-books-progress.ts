import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardBooksProgressGetResponse } from '@modules/api/types/dashboard-api.types';

export interface UseBooksProgressReturn
  extends Pick<UseQueryResult<DashboardBooksProgressGetResponse | undefined>, 'data' | 'isLoading'> {
  page: number;
  setPageIndex: (index: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
}

interface UseBooksProgressParams {
  pageSize: number;
}

const buildUrl = (page: number, pageSize: number): string => {
  const url = new URL('/api/dashboard/books-progress', __URL__);
  url.searchParams.set('pageIndex', String(page));
  url.searchParams.set('pageSize', String(pageSize));
  return url.toString();
};

export const useBooksProgress = (params: UseBooksProgressParams = { pageSize: 3 }): UseBooksProgressReturn => {
  const { pageSize } = params;

  const { toast } = useToast();
  const [page, setPage] = useState(0);

  const { data, status, isPlaceholderData } = useQuery<DashboardBooksProgressGetResponse | undefined>({
    queryKey: ['dashboard-books-progress', page],
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      try {
        const url = buildUrl(page, pageSize);
        const response = await fetch(url, { method: 'GET' });

        const responseData = (await response.json()) as DashboardBooksProgressGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch books progress';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  const previousPage = useCallback(() => {
    setPage((old) => Math.max(old - 1, 0));
  }, []);

  const nextPage = useCallback(() => {
    if (!data?.data) return;

    if (!isPlaceholderData && data.data.hasMore) {
      setPage((old) => old + 1);
    }
  }, [data?.data?.hasMore, isPlaceholderData]);

  const setPageIndex = useCallback(
    (index: number) => {
      if (!data?.data) return;

      if (index >= 0 && index <= data.data.pageCount) setPage(index);
    },
    [data?.data]
  );

  const getCanPreviousPage = useCallback(() => {
    return page !== 0;
  }, [page]);

  const getCanNextPage = useCallback(() => {
    if (!data?.data) return false;

    return !(isPlaceholderData || !data.data.hasMore);
  }, [data?.data, isPlaceholderData]);

  return {
    data,
    isLoading: status === 'pending',
    page,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    setPageIndex,
  };
};
