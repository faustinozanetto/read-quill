import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTargetsCreatedGetResponse } from '@modules/api/types/dashboard-api.types';

type UseReadTargetsCreatedReturn = Pick<
  UseQueryResult<DashboardReadTargetsCreatedGetResponse>,
  'data' | 'isLoading' | 'isFetching'
>;

export const useReadTargetsCreated = (): UseReadTargetsCreatedReturn => {
  const { toast } = useToast();

  const { data, isFetching, isLoading } = useQuery<DashboardReadTargetsCreatedGetResponse>(
    ['dashboard-read-targets-created'],
    {
      initialData: { created: false },
      queryFn: async () => {
        try {
          const url = new URL('/api/dashboard/read-targets/created', __URL__);

          const response = await fetch(url, { method: 'GET' });
          if (!response.ok) {
            throw new Error('Failed to fetch read targets created!');
          }

          return response.json();
        } catch (error) {
          toast({ variant: 'error', content: 'Failed to fetch read targets created!' });
        }
      },
    }
  );

  return { data, isFetching, isLoading };
};
