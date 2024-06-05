import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTimeDistributionGetResponse } from '@modules/api/types/dashboard-api.types';

type UseReadTimeDistributionReturn = Pick<
  UseQueryResult<DashboardReadTimeDistributionGetResponse | undefined>,
  'data' | 'isLoading'
>;

export const useReadsTimeDistribution = (): UseReadTimeDistributionReturn => {
  const { toast } = useToast();

  const { data, isLoading, isFetching } = useQuery<DashboardReadTimeDistributionGetResponse | undefined>({
    queryKey: ['dashboard-read-time-distribution'],
    initialData: {
      data: { timeDistribution: [] },
    },
    queryFn: async () => {
      try {
        const url = new URL('/api/dashboard/read-time-distribution', __URL__);
        url.searchParams.set('group-size', '60');

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as DashboardReadTimeDistributionGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch read time distribution!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: isLoading || isFetching };
};
