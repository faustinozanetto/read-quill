import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { PaginationState } from '@tanstack/react-table';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadRegistriesGetResponse } from '@modules/api/types/dashboard-api.types';

export interface UseReadRegistriesReturn
  extends Pick<UseQueryResult<DashboardReadRegistriesGetResponse | undefined>, 'data' | 'isLoading'> {
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

interface UseReadRegistriesParams {
  pageSize: number;
}

export const useReadRegistries = (params: UseReadRegistriesParams = { pageSize: 4 }): UseReadRegistriesReturn => {
  const { pageSize } = params;

  const { toast } = useToast();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const { data, status } = useQuery<DashboardReadRegistriesGetResponse | undefined>({
    queryKey: ['dashboard-read-registries', pagination],
    queryFn: async () => {
      try {
        const url = new URL('/api/dashboard/read-registries', __URL__);
        url.searchParams.set('pageIndex', String(pagination.pageIndex));
        url.searchParams.set('pageSize', String(pagination.pageSize));

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as DashboardReadRegistriesGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch read registries!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });
  return { data, isLoading: status === 'pending', pagination, setPagination };
};
