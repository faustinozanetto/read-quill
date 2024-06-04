import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadsUserGetResponse } from '@modules/api/types/community-api.types';

export interface UseUserThreadsReturn
  extends Pick<
    UseInfiniteQueryResult<ThreadsUserGetResponse>,
    'data' | 'fetchNextPage' | 'hasNextPage' | 'isFetchingNextPage' | 'isLoading'
  > {}

interface UseUserThreadsParams {
  pageSize: number;
  userId: string;
}

const buildUrl = (userId: string, cursor: string | null, pageSize: number): string => {
  const url = new URL('/api/community/threads/user', __URL__);
  if (cursor) url.searchParams.set('cursor', cursor);
  url.searchParams.set('pageSize', String(pageSize));
  url.searchParams.set('userId', userId);
  return url.toString();
};

export const useUserThreads = (params: UseUserThreadsParams): UseUserThreadsReturn => {
  const { userId, pageSize } = params;

  const { toast } = useToast();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } =
    useInfiniteQuery<ThreadsUserGetResponse>({
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.hasMore) return undefined; // Stop fetching if no more pages
        return lastPage.nextCursor; // Return the next cursor for the next page
      },
      queryFn: async ({ pageParam = null }) => {
        try {
          const url = buildUrl(userId, pageParam, pageSize);
          const response = await fetch(url, { method: 'GET' });

          if (!response.ok) {
            throw new Error('Failed to fetch user threads!');
          }

          return response.json();
        } catch (error) {
          toast({ variant: 'error', content: 'Failed to fetch user threads!' });
        }
      },
      queryKey: ['user-threads', userId],
    });

  return { data, fetchNextPage, isFetchingNextPage, isLoading: isLoading || isFetching, hasNextPage };
};
