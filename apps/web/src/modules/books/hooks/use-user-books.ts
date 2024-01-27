import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { UserBooksGetResponse } from '@modules/api/types/books-api.types';

export interface UseUserBooksReturn {
  data: UserBooksGetResponse;
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  nextPage: () => void;
  previousPage: () => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
}

interface UseUserBooksParams {
  pageSize: number;
}

const buildUrl = (page: number, pageSize: number): string => {
  const url = new URL('/api/books/user', __URL__);
  url.searchParams.set('pageIndex', String(page));
  url.searchParams.set('pageSize', String(pageSize));
  return url.toString();
};

export const useUserBooks = (params: UseUserBooksParams = { pageSize: 3 }): UseUserBooksReturn => {
  const { pageSize } = params;
  const [page, setPage] = useState(0);

  const { data, isLoading, isFetching, isPreviousData } = useQuery<UserBooksGetResponse>(['user-books', page], {
    initialData: { books: [], hasMore: false, pageCount: 0 },
    keepPreviousData: true,
    queryFn: async () => {
      try {
        const url = buildUrl(page, pageSize);
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Failed to fetch user books!');
        }

        return response.json();
      } catch (error) {
        if (error instanceof Error) throw new Error(`Failed to fetch user books: ${error.message}`);
      }
    },
  });

  const previousPage = useCallback(() => {
    setPage((old) => Math.max(old - 1, 0));
  }, []);

  const nextPage = useCallback(() => {
    if (!isPreviousData && data.hasMore) {
      setPage((old) => old + 1);
    }
  }, [data.hasMore, isPreviousData]);

  const getCanPreviousPage = useCallback(() => {
    return page !== 0;
  }, [page]);

  const getCanNextPage = useCallback(() => {
    return !(isPreviousData || !data?.hasMore);
  }, [data?.hasMore, isPreviousData]);

  return { data, isLoading, isFetching, page, getCanPreviousPage, getCanNextPage, previousPage, nextPage };
};
