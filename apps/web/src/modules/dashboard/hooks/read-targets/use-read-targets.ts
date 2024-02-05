import type { DefinedUseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { DashboardReadTargetsGetResponse } from '@modules/api/types/dashboard-api.types';
import { useReadTargetsCreated } from './use-read-targets-created';

type UseReadTargetsReturn = Pick<DefinedUseQueryResult<DashboardReadTargetsGetResponse>, 'isLoading' | 'isFetching'> & {
  data?: DashboardReadTargetsGetResponse;
};

export const useReadTargets = (): UseReadTargetsReturn => {
  const { toast } = useToast();

  const {
    data: readTargetsCreatedData,
    isLoading: isReadTargetsCreatedLoading,
    isFetching: isReadTargetsCreatedFetching,
  } = useReadTargetsCreated();

  const { data, isLoading, isFetching } = useQuery<DashboardReadTargetsGetResponse>(
    ['dashboard-read-targets', readTargetsCreatedData],
    {
      enabled: readTargetsCreatedData.created,
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
    }
  );
  return {
    data,
    isLoading: isLoading && isReadTargetsCreatedLoading,
    isFetching: isFetching && isReadTargetsCreatedFetching,
  };
};
