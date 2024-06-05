import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';

import { useCallback, useState } from 'react';
import { BookAnnotationsGetResponse } from '@modules/api/types/annotations-api.types';
import { useToast } from '@read-quill/design-system';

interface UseBookAnnotationsReturn
  extends Pick<UseQueryResult<BookAnnotationsGetResponse | undefined>, 'data' | 'isLoading'> {
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

  const { toast } = useToast();
  const [page, setPage] = useState(0);

  const { data, isFetching, isLoading, isPlaceholderData } = useQuery<BookAnnotationsGetResponse | undefined>({
    queryKey: ['book-annotations', bookId],
    enabled: !!bookId,
    initialData: {
      data: { annotations: [], hasMore: false, pageCount: 0 },
    },
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      try {
        if (!bookId) return;

        const url = buildUrl(page, pageSize, bookId);
        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as BookAnnotationsGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch book annotations!';
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
