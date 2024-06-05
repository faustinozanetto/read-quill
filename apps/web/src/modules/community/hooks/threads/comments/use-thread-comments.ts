import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadCommentsGetResponse } from '@modules/api/types/community-api.types';
import { useToast } from '@read-quill/design-system';

export interface UseThreadCommentsReturn
  extends Pick<UseQueryResult<ThreadCommentsGetResponse | undefined>, 'data' | 'isLoading'> {
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

  const { data, status, isPlaceholderData } = useQuery<ThreadCommentsGetResponse | undefined>({
    queryKey: ['thread-comments', page, threadId],
    enabled: typeof threadId !== undefined,
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      try {
        if (!threadId) return;

        const url = buildUrl(threadId, page, pageSize);
        const response = await fetch(url, { method: 'GET' });

        const responseData = (await response.json()) as ThreadCommentsGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch thread comments!';
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
