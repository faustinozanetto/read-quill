import { DefinedUseQueryResult, useQuery } from '@tanstack/react-query';
import { ThreadVoteGetResponse } from '@modules/api/types/community-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';

interface UseIsThreadVoteReturn
  extends Pick<DefinedUseQueryResult<ThreadVoteGetResponse>, 'data' | 'isLoading' | 'isFetching'> {}

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

  const { data, isLoading, isFetching } = useQuery<ThreadVoteGetResponse>(['thread-vote-count', threadId], {
    initialData: { votes: 0 },
    enabled: typeof threadId !== 'undefined',
    queryFn: async () => {
      try {
        if (!threadId) return;

        const url = buildUrl(threadId);
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
          throw new Error('Failed to fetch thread votes!');
        }

        return response.json();
      } catch (error) {
        toast({ variant: 'error', content: 'Failed to fetch thread votes' });
      }
    },
  });

  return { data, isLoading, isFetching };
};
