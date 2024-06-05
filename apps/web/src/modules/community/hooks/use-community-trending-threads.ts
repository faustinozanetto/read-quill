import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadsCommunityTrendingGetResponse } from '@modules/api/types/community-api.types';

export interface UseCommunityTrendingThreadsReturn
  extends Pick<UseQueryResult<ThreadsCommunityTrendingGetResponse | undefined>, 'data' | 'isLoading'> {}

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

  const { data, isLoading, isFetching } = useQuery<ThreadsCommunityTrendingGetResponse | undefined>({
    queryKey: ['community-trending-threads'],
    initialData: {
      data: { threads: [] },
    },
    queryFn: async () => {
      try {
        const url = buildUrl(pageSize);
        const response = await fetch(url, { method: 'GET' });

        const responseData = (await response.json()) as ThreadsCommunityTrendingGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch trending threads!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: isLoading || isFetching };
};
