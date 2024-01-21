import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';

interface UseReadTargetsCreatedReturn {
  readTargetsCreated: boolean;
  isLoading: boolean;
}

export const useReadTargetsCreated = (): UseReadTargetsCreatedReturn => {
  const { data: readTargetsCreated, isLoading } = useQuery<boolean>(['dashboard-read-targets-created'], {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const url = new URL('/api/dashboard/read-targets/created', __URL__);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch book!');
      }

      const { created } = await response.json();
      return created;
    },
  });

  return { readTargetsCreated: Boolean(readTargetsCreated), isLoading };
};
