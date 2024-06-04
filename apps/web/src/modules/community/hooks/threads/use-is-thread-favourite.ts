import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ThreadFavouriteGetResponse } from '@modules/api/types/community-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';

interface UseIsThreadFavouriteReturn extends Pick<UseQueryResult<ThreadFavouriteGetResponse>, 'data' | 'isLoading'> {}

interface UseIsThreadFavouriteParams {
  threadId: string;
  userId?: string;
}

const buildUrl = (threadId: string, userId: string): string => {
  const url = new URL('/api/community/thread/favourite', __URL__);
  url.searchParams.set('threadId', threadId);
  url.searchParams.set('userId', userId);
  return url.toString();
};

export const useIsThreadFavourite = (params: UseIsThreadFavouriteParams): UseIsThreadFavouriteReturn => {
  const { threadId, userId } = params;

  const { toast } = useToast();

  const { data, isLoading, isFetching } = useQuery<ThreadFavouriteGetResponse>(['thread-favourite', threadId, userId], {
    enabled: typeof userId !== 'undefined',
    queryFn: async () => {
      try {
        if (!userId) return;

        const url = buildUrl(threadId, userId);
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Failed to fetch thread favourite!');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetch thread favourite' });
      }
    },
  });

  return { data, isLoading: isLoading || isFetching };
};
