import { useInfiniteQuery } from '@tanstack/react-query';
import { useToast } from '@read-quill/design-system/src';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadsCommunityGetResponse } from '@modules/api/types/community-api.types';

export interface UseCommunityThreadsReturn
  extends Pick<
    ReturnType<typeof useInfiniteQuery<ThreadsCommunityGetResponse | undefined, Error>>,
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } = useInfiniteQuery<
    ThreadsCommunityGetResponse | undefined,
    Error
  >({
    queryKey: ['community-threads'],
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.data?.hasMore) return undefined; // Stop fetching if no more pages
      return lastPage.data.nextCursor; // Return the next cursor for the next page
    },
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      try {
        const url = buildUrl(pageParam as string | null, pageSize);
        const response = await fetch(url, { method: 'GET' });

        const responseData = (await response.json()) as ThreadsCommunityGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch threads!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, fetchNextPage, isFetchingNextPage, isLoading: isLoading || isFetching, hasNextPage };
};
