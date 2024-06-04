import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';

type UseReadTargetsReturn = Pick<UseQueryResult<DashboardReadTargetsGetResponse>, 'isLoading'> & {
  data?: DashboardReadTargetsGetResponse;
  targetsCreated: boolean;
};

export const useReadTargets = (): UseReadTargetsReturn => {
  const { toast } = useToast();

  const { data, isLoading, isFetching } = useQuery<DashboardReadTargetsGetResponse>(['dashboard-read-targets'], {
    queryFn: async () => {
      try {
        const url = new URL('/api/dashboard/read-targets', __URL__);

        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch user read targets!');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetch read targets!' });
      }
    },
  });

  return {
    targetsCreated: Boolean(data?.result),
    data,
    isLoading: isLoading || isFetching,
  };
};
