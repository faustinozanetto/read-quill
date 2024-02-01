import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { DefinedUseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { PaginationState } from '@tanstack/react-table';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadRegistriesGetResponse } from '@modules/api/types/dashboard-api.types';

interface UseReadRegistriesReturn
  extends Pick<DefinedUseQueryResult<DashboardReadRegistriesGetResponse>, 'data' | 'isLoading' | 'isFetching'> {
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

interface UseReadRegistriesParams {
  pageSize: number;
}

export const useReadRegistries = (params: UseReadRegistriesParams = { pageSize: 4 }): UseReadRegistriesReturn => {
  const { pageSize } = params;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const { data, isLoading, isFetching } = useQuery<DashboardReadRegistriesGetResponse>(
    ['dashboard-read-registries', pagination],
    {
      initialData: { readRegistries: [], pageCount: 0 },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      queryFn: async () => {
        const url = new URL('/api/dashboard/read-registries', __URL__);
        url.searchParams.set('pageIndex', String(pagination.pageIndex));
        url.searchParams.set('pageSize', String(pagination.pageSize));

        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch user read registries!');
        }

        return response.json();
      },
    }
  );
  return { data, isLoading, isFetching, pagination, setPagination };
};
