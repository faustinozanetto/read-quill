import { __URL__ } from '@modules/common/lib/common.constants';
import { useQuery } from '@tanstack/react-query';

interface UseReadTargetsCreatedReturn {
  readTargetsCreated: boolean;
  isLoading: boolean;
}

export const useReadTargetsCreated = (): UseReadTargetsCreatedReturn => {
  const { data: readTargetsCreated, isLoading } = useQuery<Boolean>(['dashboard-read-targets-created'], {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const url = new URL('/api/dashboard/read-targets/created', __URL__);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch book!');
      }

      const data = await response.json();
      return data.created;
    },
  });

  return { readTargetsCreated: Boolean(readTargetsCreated), isLoading };
};
