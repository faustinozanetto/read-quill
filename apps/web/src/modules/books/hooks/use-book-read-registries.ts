import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { PaginationState } from '@tanstack/react-table';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';

import { BookReadRegistriesGetResponse } from '@modules/api/types/books-api.types';

export interface UseBookReadRegistriesReturn
  extends Pick<UseQueryResult<BookReadRegistriesGetResponse | undefined>, 'data' | 'isLoading'> {
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

interface UseBookReadRegistriesParams {
  pageSize: number;
  bookId?: string;
}

export const useBookReadRegistries = (
  params: UseBookReadRegistriesParams = { pageSize: 4 }
): UseBookReadRegistriesReturn => {
  const { pageSize, bookId } = params;

  const { toast } = useToast();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const { data, status } = useQuery<BookReadRegistriesGetResponse | undefined>({
    queryKey: ['book-read-registries', pagination, bookId],
    enabled: typeof bookId !== 'undefined',
    queryFn: async () => {
      try {
        if (!bookId) return;

        const url = new URL('/api/book/read-registries', __URL__);
        url.searchParams.set('bookId', bookId);
        url.searchParams.set('pageIndex', String(pagination.pageIndex));
        url.searchParams.set('pageSize', String(pagination.pageSize));

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as BookReadRegistriesGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch book read registries!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });
  return { data, isLoading: status === 'pending', pagination, setPagination };
};
