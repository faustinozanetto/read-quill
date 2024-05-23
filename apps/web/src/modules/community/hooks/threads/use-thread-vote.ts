import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ThreadVotePostResponse } from '@modules/api/types/community-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { VoteThreadActionData } from '@modules/community/types/community-thread-validations.types';

interface UseIsThreadVoteReturn
  extends Pick<UseMutationResult<ThreadVotePostResponse, unknown, VoteThreadActionData>, 'mutateAsync' | 'isLoading'> {}

export const useThreadVote = (): UseIsThreadVoteReturn => {
  const { toast } = useToast();

  const { queryClient } = useQueriesStore();

  const { mutateAsync, isLoading } = useMutation<ThreadVotePostResponse, unknown, VoteThreadActionData>(
    ['thread-vote'],
    {
      mutationFn: async (data) => {
        try {
          const { type, threadId } = data;
          const url = new URL('/api/community/thread/vote', __URL__);
          const body = JSON.stringify({
            threadId,
            type,
          });
          const response = await fetch(url, { method: 'POST', body });

          if (!response.ok) {
            throw new Error('Failed to vote thread!');
          }

          return response.json();
        } catch (error) {
          toast({ variant: 'error', content: 'Failed to vote thread!' });
        }
      },
      async onSuccess(data, variables) {
        if (!data) return;

        const { success, alredyVoted } = data;
        if (!success) return;

        await queryClient.refetchQueries(['thread-vote-count', variables.threadId]);

        if (alredyVoted) {
          toast({ variant: 'info', content: `You already ${variables.type}d this thread!` });
        } else {
          toast({ variant: 'success', content: `Thread ${variables.type}d successfully!` });
        }
      },
    }
  );

  return { mutateAsync, isLoading };
};
