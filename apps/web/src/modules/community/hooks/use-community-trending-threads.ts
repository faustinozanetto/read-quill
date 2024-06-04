import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadsCommunityTrendingGetResponse } from '@modules/api/types/community-api.types';

export interface UseCommunityTrendingThreadsReturn
  extends Pick<UseQueryResult<ThreadsCommunityTrendingGetResponse>, 'data' | 'isLoading'> {}

interface UseCommunityTrendingThreadsParams {
  pageSize: number;
}

const buildUrl = (pageSize: number): string => {
  const url = new URL('/api/community/threads/trending', __URL__);
  url.searchParams.set('pageSize', String(pageSize));
  return url.toString();
};

export const useCommunityTrendingThreads = (
  params: UseCommunityTrendingThreadsParams = { pageSize: 3 }
): UseCommunityTrendingThreadsReturn => {
  const { pageSize } = params;

  const { toast } = useToast();

  const { data, isLoading, isFetching } = useQuery<ThreadsCommunityTrendingGetResponse>({
    queryKey: ['community-trending-threads'],
    queryFn: async () => {
      try {
        const url = buildUrl(pageSize);
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Failed to fetch community trending threads!');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetch community trending threads!' });
      }
    },
  });

  return { data, isLoading: isLoading || isFetching };
};
