import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadActivityGetResponse } from '@modules/api/types/dashboard-api.types';

type UseReadActivityReturn = Pick<UseQueryResult<DashboardReadActivityGetResponse>, 'data' | 'isLoading'>;
export const useReadActivity = (): UseReadActivityReturn => {
  const { toast } = useToast();

  const { data, isFetching, isLoading } = useQuery<DashboardReadActivityGetResponse>(['dashboard-read-activity'], {
    queryFn: async () => {
      try {
        const url = new URL('/api/dashboard/read-activity', __URL__);

        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch user read activity!');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetch read activity!' });
      }
    },
  });

  return { data, isLoading: isLoading || isFetching };
};
