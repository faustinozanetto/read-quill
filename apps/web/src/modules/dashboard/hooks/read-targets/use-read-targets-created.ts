import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTargetsCreatedGetResponse } from '@modules/api/types/dashboard-api.types';

interface UseReadTargetsCreatedReturn {
  data: DashboardReadTargetsCreatedGetResponse;
  isFetching: boolean;
}

export const useReadTargetsCreated = (): UseReadTargetsCreatedReturn => {
  const { data, isFetching } = useQuery<DashboardReadTargetsCreatedGetResponse>(['dashboard-read-targets-created'], {
    initialData: { created: false },
    queryFn: async () => {
      const url = new URL('/api/dashboard/read-targets/created', __URL__);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch book!');
      }

      return response.json();
    },
  });

  return { data, isFetching };
};
