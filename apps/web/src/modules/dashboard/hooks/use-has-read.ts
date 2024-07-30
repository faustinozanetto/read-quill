import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardHasReadGetResponse } from '@modules/api/types/dashboard-api.types';

export interface UseHasReadReturn
  extends Pick<UseQueryResult<DashboardHasReadGetResponse | undefined>, 'data' | 'isLoading'> {}

export const useHasRead = (): UseHasReadReturn => {
  const { toast } = useToast();

  const { data, status } = useQuery<DashboardHasReadGetResponse | undefined>({
    queryKey: ['dashboard-has-read'],
    queryFn: async () => {
      try {
        const url = new URL('/api/dashboard/has-read', __URL__);

        const response = await fetch(url, { method: 'GET' });
        const responseData = (await response.json()) as DashboardHasReadGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch has read!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });
  return { data, isLoading: status === 'pending' };
};
