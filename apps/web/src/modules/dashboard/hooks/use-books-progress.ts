import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardBooksProgressGetResponse } from '@modules/api/types/dashboard-api.types';

export interface UseBooksProgressReturn
  extends Pick<UseQueryResult<DashboardBooksProgressGetResponse>, 'data' | 'isLoading'> {
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

  const { data, isLoading, isFetching, isPreviousData } = useQuery<DashboardBooksProgressGetResponse>(
    ['dashboard-books-progress', page],
    {
      keepPreviousData: true,
      queryFn: async () => {
        try {
          const url = buildUrl(page, pageSize);
          const response = await fetch(url, { method: 'GET' });

          if (!response.ok) {
            throw new Error('Failed to fetch user books progress!');
          }

          return response.json();
        } catch (error) {
          toast({ variant: 'error', content: 'Failed to fetch books progress!' });
        }
      },
    }
  );
  const previousPage = useCallback(() => {
    setPage((old) => Math.max(old - 1, 0));
  }, []);

  const nextPage = useCallback(() => {
    if (!isPreviousData && data?.hasMore) {
      setPage((old) => old + 1);
    }
  }, [data?.hasMore, isPreviousData]);

  const setPageIndex = useCallback(
    (index: number) => {
      if (!data?.pageCount) return;

      if (index >= 0 && index <= data.pageCount) setPage(index);
    },
    [data?.pageCount]
  );

  const getCanPreviousPage = useCallback(() => {
    return page !== 0;
  }, [page]);

  const getCanNextPage = useCallback(() => {
    return !(isPreviousData || !data?.hasMore);
  }, [data?.hasMore, isPreviousData]);

  return {
    data,
    isLoading: isLoading || isFetching,
    page,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    setPageIndex,
  };
};
