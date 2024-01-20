import { __URL__ } from '@modules/common/lib/common.constants';
import { ReadTargets } from '@read-quill/database';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface UseReadTargetsReturn {
  targetReadTargets?: Omit<ReadTargets, 'id' | 'userId'>;
  readTargets?: Omit<ReadTargets, 'id' | 'userId'>;
  isLoading: boolean;
}

export const useReadTargets = (): UseReadTargetsReturn => {
  const queryClient = useQueryClient();

  const readTargetsCreated = queryClient.getQueryData(['dashboard-read-targets-created']);

  const { data, isLoading } = useQuery<{
    targetReadTargets: Omit<ReadTargets, 'id' | 'userId'>;
    readTargets: Omit<ReadTargets, 'id' | 'userId'>;
  }>(['dashboard-read-targets'], {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(readTargetsCreated),
    queryFn: async () => {
      const url = new URL('/api/dashboard/read-targets', __URL__);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch user read targets!');
      }

      return await response.json();
    },
  });
  return { readTargets: data?.readTargets, targetReadTargets: data?.targetReadTargets, isLoading };
};
