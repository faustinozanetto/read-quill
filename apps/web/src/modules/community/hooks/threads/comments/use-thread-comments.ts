import type { DefinedUseQueryResult, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadCommentsGetResponse } from '@modules/api/types/community-api.types';

export interface UseThreadCommentsReturn extends Pick<UseQueryResult<ThreadCommentsGetResponse>, 'data' | 'isLoading'> {
  page: number;
  setPageIndex: (index: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
}

interface UseThreadCommentsParams {
  pageSize: number;
  threadId?: string;
}

const buildUrl = (threadId: string, page: number, pageSize: number): string => {
  const url = new URL('/api/community/thread/comments', __URL__);
  url.searchParams.set('threadId', threadId);
  url.searchParams.set('pageIndex', String(page));
  url.searchParams.set('pageSize', String(pageSize));
  return url.toString();
};

export const useThreadComments = (params: UseThreadCommentsParams): UseThreadCommentsReturn => {
  const { pageSize, threadId } = params;

  const { toast } = useToast();

  const [page, setPage] = useState(0);

  const { data, isLoading, isFetching, isPreviousData } = useQuery<ThreadCommentsGetResponse>(
    ['thread-comments', page, threadId],
    {
      enabled: threadId !== undefined,
      keepPreviousData: true,
      queryFn: async () => {
        try {
          if (!threadId) return;

          const url = buildUrl(threadId, page, pageSize);
          const response = await fetch(url, { method: 'GET' });

          if (!response.ok) {
            throw new Error('Failed to fetch thread comments!');
          }

          return response.json();
        } catch (error) {
          toast({ variant: 'error', content: 'Failed to fetch thread comments!' });
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
