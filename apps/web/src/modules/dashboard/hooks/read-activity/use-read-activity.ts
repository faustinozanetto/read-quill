import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadActivityGetResponse } from '@modules/api/types/api.types';

interface UseReadActivityReturn {
  data: DashboardReadActivityGetResponse;
  isFetching: boolean;
}

export const useReadActivity = (): UseReadActivityReturn => {
  const { data, isFetching } = useQuery<DashboardReadActivityGetResponse>(['dashboard-read-activity'], {
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

  return { data, isFetching };
};
