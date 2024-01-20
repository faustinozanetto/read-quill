import { __URL__ } from '@modules/common/lib/common.constants';
import { ReadRegistry } from '@read-quill/database';
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

      const data = await response.json();
      return data.readRegistries;
    },
  });
  return { readRegistries: data ?? [], isLoading };
};
