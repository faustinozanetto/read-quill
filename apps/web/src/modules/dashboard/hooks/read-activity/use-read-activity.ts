import type { DefinedUseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadActivityGetResponse } from '@modules/api/types/dashboard-api.types';

type UseReadActivityReturn = Pick<
  DefinedUseQueryResult<DashboardReadActivityGetResponse>,
  'data' | 'isLoading' | 'isFetching'
>;
export const useReadActivity = (): UseReadActivityReturn => {
  const { data, isFetching, isLoading } = useQuery<DashboardReadActivityGetResponse>(['dashboard-read-activity'], {
    initialData: { readActivity: {} },
    queryFn: async () => {
      const url = new URL('/api/dashboard/read-activity', __URL__);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch user read activity!');
      }

      return response.json();
    },
  });

  return { data, isFetching, isLoading };
};
