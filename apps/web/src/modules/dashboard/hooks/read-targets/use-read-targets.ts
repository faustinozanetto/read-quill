import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';

type UseReadTargetsReturn = Pick<UseQueryResult<DashboardReadTargetsGetResponse | undefined>, 'data' | 'isLoading'> & {
  targetsCreated: boolean;
};

export const useReadTargets = (): UseReadTargetsReturn => {
  const { data, status } = useQuery<DashboardReadTargetsGetResponse | undefined>({
    queryKey: ['dashboard-read-targets'],
    queryFn: async () => {
      const url = new URL('/api/dashboard/read-targets', __URL__);

      const response = await fetch(url, { method: 'GET' });
      const responseData = (await response.json()) as DashboardReadTargetsGetResponse;

      if (!response.ok) {
        return;
      }

      return responseData;
    },
  });

  return {
    targetsCreated: Boolean(data?.data?.readTargets),
    data,
    isLoading: status === 'pending',
  };
};
