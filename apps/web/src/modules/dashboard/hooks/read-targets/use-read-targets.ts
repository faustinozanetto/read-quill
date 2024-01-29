import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';
import { useReadTargetsCreated } from './use-read-targets-created';

interface UseReadTargetsReturn {
  data?: DashboardReadTargetsGetResponse;
  isLoading: boolean;
  isFetching: boolean;
}

export const useReadTargets = (): UseReadTargetsReturn => {
  const {
    data: readTargetsCreatedData,
    isLoading: isReadTargetsCreatedLoading,
    isFetching: isReadTargetsCreatedFetching,
  } = useReadTargetsCreated();

  const { data, isLoading, isFetching } = useQuery<DashboardReadTargetsGetResponse>(
    ['dashboard-read-targets', readTargetsCreatedData],
    {
      enabled: readTargetsCreatedData.created,
      queryFn: async () => {
        const url = new URL('/api/dashboard/read-targets', __URL__);

        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch user read targets!');
        }

        return response.json();
      },
    }
  );
  return {
    data,
    isLoading: isLoading && isReadTargetsCreatedLoading,
    isFetching: isFetching && isReadTargetsCreatedFetching,
  };
};
