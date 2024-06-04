import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadsCommunityGetResponse } from '@modules/api/types/community-api.types';

export interface UseCommunityThreadsReturn
  extends Pick<
    UseInfiniteQueryResult<ThreadsCommunityGetResponse>,
    'data' | 'fetchNextPage' | 'hasNextPage' | 'isFetchingNextPage' | 'isLoading'
  > {}

interface UseCommunityThreadsParams {
  pageSize: number;
}

const buildUrl = (cursor: string | null, pageSize: number): string => {
  const url = new URL('/api/community/threads', __URL__);
  if (cursor) url.searchParams.set('cursor', cursor);
  url.searchParams.set('pageSize', String(pageSize));
  return url.toString();
};

export const useCommunityThreads = (params: UseCommunityThreadsParams = { pageSize: 3 }): UseCommunityThreadsReturn => {
  const { pageSize } = params;

  const { toast } = useToast();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } =
    useInfiniteQuery<ThreadsCommunityGetResponse>({
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.hasMore) return undefined; // Stop fetching if no more pages
        return lastPage.nextCursor; // Return the next cursor for the next page
      },
      queryFn: async ({ pageParam = null }) => {
        try {
          const url = buildUrl(pageParam, pageSize);
          const response = await fetch(url, { method: 'GET' });

          if (!response.ok) {
            throw new Error('Failed to fetch community threads!');
          }

          return response.json();
        } catch (error) {
          toast({ variant: 'error', content: 'Failed to fetch community threads!' });
        }
      },
      queryKey: ['community-threads'],
    });

  return { data, fetchNextPage, isFetchingNextPage, isLoading: isLoading || isFetching, hasNextPage };
};
