import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ThreadFavouriteGetResponse } from '@modules/api/types/community-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';

interface UseIsThreadFavouriteReturn
  extends Pick<UseQueryResult<ThreadFavouriteGetResponse | undefined>, 'data' | 'isLoading'> {}

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

  const { data, status } = useQuery<ThreadFavouriteGetResponse | undefined>({
    queryKey: ['thread-favourite', threadId, userId],
    enabled: !!userId,
    queryFn: async () => {
      try {
        if (!userId) return;

        const url = buildUrl(threadId, userId);
        const response = await fetch(url, { method: 'GET' });

        const responseData = (await response.json()) as ThreadFavouriteGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch thread favourite!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: status === 'pending' };
};
