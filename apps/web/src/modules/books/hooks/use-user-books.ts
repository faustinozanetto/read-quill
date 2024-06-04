import type { DefinedUseQueryResult, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { UserBooksGetResponse } from '@modules/api/types/books-api.types';

export interface UseUserBooksReturn extends Pick<UseQueryResult<UserBooksGetResponse>, 'data' | 'isLoading'> {
  page: number;
  setPageIndex: (index: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
}

interface UseUserBooksParams {
  pageSize: number;
  userId?: string;
}

const buildUrl = (page: number, pageSize: number, userId: string): string => {
  const url = new URL('/api/book/user', __URL__);
  url.searchParams.set('pageIndex', String(page));
  url.searchParams.set('pageSize', String(pageSize));
  url.searchParams.set('userId', userId);
  return url.toString();
};

export const useUserBooks = (params: UseUserBooksParams): UseUserBooksReturn => {
  const { pageSize, userId } = params;

  const { toast } = useToast();

  const [page, setPage] = useState(0);

  const { data, isLoading, isFetching, isPreviousData } = useQuery<UserBooksGetResponse>(['user-books', page, userId], {
    keepPreviousData: true,
    enabled: !!userId,
    queryFn: async () => {
      try {
        if (!userId) return;

        const url = buildUrl(page, pageSize, userId);
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Failed to fetch user books!');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetch user books!' });
      }
    },
  });

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
