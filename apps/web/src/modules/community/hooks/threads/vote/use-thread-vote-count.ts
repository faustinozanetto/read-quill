import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ThreadVoteGetResponse } from '@modules/api/types/community-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';

interface UseIsThreadVoteReturn extends Pick<UseQueryResult<ThreadVoteGetResponse | undefined>, 'data' | 'isLoading'> {}

const buildUrl = (threadId: string): string => {
  const url = new URL('/api/community/thread/vote', __URL__);
  url.searchParams.set('threadId', threadId);
  return url.toString();
};

interface UseThreadVoteCountParams {
  threadId?: string;
}

export const useThreadVoteCount = (params: UseThreadVoteCountParams): UseIsThreadVoteReturn => {
  const { threadId } = params;

  const { toast } = useToast();
  const { data, isLoading, isFetching } = useQuery<ThreadVoteGetResponse | undefined>({
    queryKey: ['thread-vote-count', threadId],
    enabled: typeof threadId !== 'undefined',
    initialData: {
      data: { votes: 0 },
    },
    queryFn: async () => {
      try {
        if (!threadId) return;

        const url = buildUrl(threadId);
        const response = await fetch(url, { method: 'GET' });

        const responseData = (await response.json()) as ThreadVoteGetResponse;

        if (!response.ok) {
          let errorMessage = response.statusText;
          if (responseData.error) errorMessage = responseData.error.message;

          throw new Error(errorMessage);
        }

        return responseData;
      } catch (error) {
        let errorMessage = 'Failed to fetch thread votes!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
  });

  return { data, isLoading: isLoading || isFetching };
};
