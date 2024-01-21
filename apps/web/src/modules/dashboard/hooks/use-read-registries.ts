import { __URL__ } from '@modules/common/lib/common.constants';
import type { ReadRegistry } from '@read-quill/database';
import { useQuery } from '@tanstack/react-query';

interface UseReadRegistriesReturn {
  readRegistries: ReadRegistry[];
  isLoading: boolean;
}

export const useReadRegistries = (): UseReadRegistriesReturn => {
  const { data, isLoading } = useQuery<ReadRegistry[]>(['dashboard-read-registries'], {
    queryFn: async () => {
      const url = new URL('/api/dashboard/read-registries', __URL__);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch user read registries!');
      }

      const { readRegistries } = await response.json();
      return readRegistries;
    },
  });
  return { readRegistries: data ?? [], isLoading };
};
