import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';

type UseReadTargetsReturn = Pick<UseQueryResult<DashboardReadTargetsGetResponse | undefined>, 'data' | 'isLoading'> & {
  targetsCreated: boolean;
};

export const useReadTargets = (): UseReadTargetsReturn => {
  const { toast } = useToast();

  const { data, isLoading, isFetching } = useQuery<DashboardReadTargetsGetResponse | undefined>({
    queryKey: ['dashboard-read-targets'],
    initialData: {
      data: {
        readTargets: {
          readTargets: { daily: 0, monthly: 0, weekly: 0 },
          targetReadTargets: { daily: 0, monthly: 0, weekly: 0 },
        },
      },
    },
    queryFn: async () => {
      try {
        const url = new URL('/api/dashboard/read-targets', __URL__);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as DashboardReadTargetsGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch read targets!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return {
    targetsCreated: Boolean(data?.data?.readTargets),
    data,
    isLoading: isLoading || isFetching,
  };
};
