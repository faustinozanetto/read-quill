import { useInfiniteQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import { FavouriteThreadsCommunityGetResponse } from '@modules/api/types/community-api.types';
import { useToast } from '@read-quill/design-system';

export interface UseCommunityFavouriteThreadsReturn
  extends Pick<
    ReturnType<typeof useInfiniteQuery<FavouriteThreadsCommunityGetResponse | undefined, Error>>,
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } = useInfiniteQuery<
    FavouriteThreadsCommunityGetResponse | undefined,
    Error
  >({
    enabled: typeof userId !== undefined,
    queryKey: ['community-favourite-threads', userId],
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.data?.hasMore) return undefined; // Stop fetching if no more pages
      return lastPage.data.nextCursor; // Return the next cursor for the next page
    },
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      try {
        if (!userId) return;

        const url = buildUrl(userId, pageParam as string | null, pageSize);
        const response = await fetch(url, { method: 'GET' });

        const responseData = (await response.json()) as FavouriteThreadsCommunityGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch favourite threads!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });
  return { data, fetchNextPage, isFetchingNextPage, isLoading: isLoading || isFetching, hasNextPage };
};
