import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadActivityGetResponse } from '@modules/api/types/dashboard-api.types';

type UseReadActivityReturn = Pick<UseQueryResult<DashboardReadActivityGetResponse | undefined>, 'data' | 'isLoading'>;
export const useReadActivity = (): UseReadActivityReturn => {
  const { toast } = useToast();

  const { data, status } = useQuery<DashboardReadActivityGetResponse | undefined>({
    queryKey: ['dashboard-read-activity'],
    queryFn: async () => {
      try {
        const url = new URL('/api/dashboard/read-activity', __URL__);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as DashboardReadActivityGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch read activity!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: status === 'pending' };
};
