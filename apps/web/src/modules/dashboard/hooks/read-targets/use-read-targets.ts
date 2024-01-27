import { useQuery, useQueryClient } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type {
  DashboardReadTargetsCreatedGetResponse,
  DashboardReadTargetsGetResponse,
} from '@modules/api/types/dashboard-api.types';

interface UseReadTargetsReturn {
  data?: DashboardReadTargetsGetResponse;
  isLoading: boolean;
  isFetching: boolean;
}

export const useReadTargets = (): UseReadTargetsReturn => {
  const queryClient = useQueryClient();

  const readTargetsCreated = queryClient.getQueryData<DashboardReadTargetsCreatedGetResponse>([
    'dashboard-read-targets-created',
  ]);

  const { data, isLoading, isFetching } = useQuery<DashboardReadTargetsGetResponse>(['dashboard-read-targets'], {
    enabled: readTargetsCreated?.created,
    queryFn: async () => {
      const url = new URL('/api/dashboard/read-targets', __URL__);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch user read targets!');
      }

      return response.json();
    },
  });
  return { data, isLoading, isFetching };
};
