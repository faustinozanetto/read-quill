import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardLastReadGetResponse } from '@modules/api/types/dashboard-api.types';

export interface UseLastReadReturn
  extends Pick<UseQueryResult<DashboardLastReadGetResponse | undefined>, 'data' | 'isLoading'> {}

interface UseLastReadParams {
  take: number;
}

const buildUrl = (take: number): string => {
  const url = new URL('/api/dashboard/last-read', __URL__);
  url.searchParams.set('take', String(take));
  return url.toString();
};

export const useLastRead = (params: UseLastReadParams = { take: 4 }): UseLastReadReturn => {
  const { take } = params;

  const { toast } = useToast();

  const { data, status, isPlaceholderData } = useQuery<DashboardLastReadGetResponse | undefined>({
    queryKey: ['dashboard-last-read'],
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      try {
        const url = buildUrl(take);
        const response = await fetch(url, { method: 'GET' });

        const responseData = (await response.json()) as DashboardLastReadGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch last read';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return {
    data,
    isLoading: status === 'pending',
  };
};
