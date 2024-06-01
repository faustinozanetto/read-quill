import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';

import { useBookStore } from '../state/book.slice';
import { useCallback, useState } from 'react';
import { BookAnnotationsGetResponse } from '@modules/api/types/annotations-api.types';

interface UseBookAnnotationsReturn extends Pick<UseQueryResult<BookAnnotationsGetResponse>, 'data' | 'isLoading'> {
  page: number;
  setPageIndex: (index: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
}

interface UseBookAnnotationsParams {
  pageSize: number;
  bookId?: string;
}

const buildUrl = (page: number, pageSize: number, bookId: string): string => {
  const url = new URL('/api/book/annotations', __URL__);
  url.searchParams.set('pageIndex', String(page));
  url.searchParams.set('pageSize', String(pageSize));
  url.searchParams.set('bookId', bookId);
  return url.toString();
};

export const useBookAnnotations = (params: UseBookAnnotationsParams): UseBookAnnotationsReturn => {
  const { pageSize, bookId } = params;

  const [page, setPage] = useState(0);

  const { data, isFetching, isLoading, isPreviousData } = useQuery<BookAnnotationsGetResponse>(
    ['book-annotations', bookId],
    {
      enabled: !!bookId,
      keepPreviousData: true,
      queryFn: async () => {
        if (!bookId) return;

        const url = buildUrl(page, pageSize, bookId);
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch book annotations');
        }

        return response.json();
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
