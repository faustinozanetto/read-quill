import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { DefinedUseQueryResult, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { PaginationState } from '@tanstack/react-table';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';

import { BookReadRegistriesGetResponse } from '@modules/api/types/books-api.types';

export interface UseBookReadRegistriesReturn
  extends Pick<UseQueryResult<BookReadRegistriesGetResponse>, 'data' | 'isLoading'> {
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

  const { data, isLoading, isFetching } = useQuery<BookReadRegistriesGetResponse>(
    ['book-read-registries', pagination, bookId],
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      queryFn: async () => {
        try {
          if (!bookId) return;

          const url = new URL('/api/book/read-registries', __URL__);
          url.searchParams.set('bookId', bookId);
          url.searchParams.set('pageIndex', String(pagination.pageIndex));
          url.searchParams.set('pageSize', String(pagination.pageSize));

          const response = await fetch(url, { method: 'GET' });
          if (!response.ok) {
            throw new Error('Failed to fetch book read registries!');
          }

          return response.json();
        } catch (error) {
          toast({ variant: 'error', content: 'Failed to fetch book read registries!' });
        }
      },
    }
  );
  return { data, isLoading: isLoading || isFetching, pagination, setPagination };
};
