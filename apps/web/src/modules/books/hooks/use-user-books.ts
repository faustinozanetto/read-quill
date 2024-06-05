import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { UserBooksGetResponse } from '@modules/api/types/books-api.types';
import { useToast } from '@read-quill/design-system';

export interface UseUserBooksReturn
  extends Pick<UseQueryResult<UserBooksGetResponse | undefined>, 'data' | 'isLoading'> {
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

  const { data, isLoading, isFetching, isPlaceholderData } = useQuery<UserBooksGetResponse | undefined>({
    queryKey: ['user-books', page, userId],
    enabled: typeof userId !== 'undefined',
    initialData: {
      data: { books: [], hasMore: false, pageCount: 0 },
    },
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      try {
        if (!userId) return;

        const url = buildUrl(page, pageSize, userId);
        const response = await fetch(url, { method: 'GET' });

        const responseData = (await response.json()) as UserBooksGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch user book!';
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
    isLoading: isLoading || isFetching,
    page,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    setPageIndex,
  };
};
