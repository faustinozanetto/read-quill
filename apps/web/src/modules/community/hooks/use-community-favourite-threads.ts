import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';
import { FavouriteThreadsCommunityGetResponse } from '@modules/api/types/community-api.types';

export interface UseCommunityFavouriteThreadsReturn
  extends Pick<
    UseInfiniteQueryResult<FavouriteThreadsCommunityGetResponse>,
    'data' | 'fetchNextPage' | 'hasNextPage' | 'isFetchingNextPage' | 'isLoading'
  > {}

interface UseCommunityFavouriteThreadsParams {
  pageSize: number;
  userId?: string;
}

const buildUrl = (userId: string, cursor: string | null, pageSize: number): string => {
  const url = new URL('/api/community/threads/favourite', __URL__);
  if (cursor) url.searchParams.set('cursor', cursor);
  url.searchParams.set('pageSize', String(pageSize));
  url.searchParams.set('userId', userId);
  return url.toString();
};

export const useCommunityFavouriteThreads = (
  params: UseCommunityFavouriteThreadsParams
): UseCommunityFavouriteThreadsReturn => {
  const { userId, pageSize } = params;

  const { toast } = useToast();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } =
    useInfiniteQuery<FavouriteThreadsCommunityGetResponse>({
      enabled: typeof userId !== undefined,
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.hasMore) return undefined; // Stop fetching if no more pages
        return lastPage.nextCursor; // Return the next cursor for the next page
      },
      queryFn: async ({ pageParam = null }) => {
        try {
          if (!userId) return;

          const url = buildUrl(userId, pageParam, pageSize);
          const response = await fetch(url, { method: 'GET' });

          if (!response.ok) {
            throw new Error('Failed to fetch community favourite threads!');
          }

          return response.json();
        } catch (error) {
          toast({ variant: 'error', content: 'Failed to fetch community favourite threads!' });
        }
      },
      queryKey: ['community-favourite-threads', userId],
    });

  return { data, fetchNextPage, isFetchingNextPage, isLoading: isLoading || isFetching, hasNextPage };
};
