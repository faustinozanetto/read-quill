import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ThreadVotePostResponse } from '@modules/api/types/community-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { VoteThreadActionData } from '@modules/community/types/community-thread-validations.types';
import { useQueryClient } from '@tanstack/react-query';

type ThreadVoteMutationResult = UseMutationResult<ThreadVotePostResponse, Error, VoteThreadActionData>;

interface UseIsThreadVoteReturn {
  voteThread: ThreadVoteMutationResult['mutateAsync'];
  isPending: ThreadVoteMutationResult['isPending'];
}

export const useThreadVote = (): UseIsThreadVoteReturn => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<ThreadVotePostResponse, Error, VoteThreadActionData>({
    mutationKey: ['thread-vote'],
    mutationFn: async (data) => {
      const url = new URL('/api/community/thread/vote', __URL__);
      const body = JSON.stringify({ ...data });
      const response = await fetch(url, { method: 'POST', body });
      const responseData = (await response.json()) as ThreadVotePostResponse;

      if (!response.ok) {
        let errorMessage = response.statusText;
        if (responseData.error) errorMessage = responseData.error.message;

        throw new Error(errorMessage);
      }

      return responseData;
    },
    async onSuccess(data, variables) {
      if (!data.data) return;

      const { alredyVoted } = data.data;

      await queryClient.refetchQueries({ queryKey: ['thread-vote-count', variables.threadId] });

      if (alredyVoted) {
        toast({ variant: 'info', content: `You already ${variables.type}d this thread!` });
      } else {
        toast({ variant: 'success', content: `Thread ${variables.type}d successfully!` });
      }
    },
    onError: (error) => {
      toast({ variant: 'error', content: error.message });
    },
  });

  return { voteThread: mutateAsync, isPending };
};
