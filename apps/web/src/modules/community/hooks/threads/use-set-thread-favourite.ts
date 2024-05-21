import { DefinedUseQueryResult, UseMutationResult, useMutation } from '@tanstack/react-query';
import { ThreadFavouriteGetResponse, ThreadFavouritePostResponse } from '@modules/api/types/community-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { useQueriesStore } from '@modules/queries/state/queries.slice';

interface UseSetThreadFavouriteReturn
  extends Pick<
    UseMutationResult<ThreadFavouritePostResponse, unknown, UseSetThreadFavouriteParams>,
    'mutateAsync' | 'isLoading'
  > {}

interface UseSetThreadFavouriteParams {
  threadId: string;
  userId: string;
  currentThreadFavourite: boolean;
}

export const useSetThreadFavourite = (): UseSetThreadFavouriteReturn => {
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();

  const { mutateAsync, isLoading } = useMutation<
    ThreadFavouritePostResponse,
    unknown,
    UseSetThreadFavouriteParams,
    unknown
  >({
    mutationFn: async (data) => {
      try {
        const { currentThreadFavourite, threadId } = data;

        const url = new URL('/api/community/thread/favourite', __URL__);
        const body = JSON.stringify({
          threadId,
          isFavourite: !currentThreadFavourite,
        });

        const response = await fetch(url, { method: 'POST', body });
        if (!response.ok) {
          throw new Error('Could not update thread favourite!');
        }

        return response.json();
      } catch (error) {
        let errorMessage = 'Could not update thread favourite!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
    onSuccess: async (data, variables) => {
      if (!data) return;

      const { success, threadFavourite } = data;
      if (!success) return;

      toast({ variant: 'success', content: `Thread ${threadFavourite ? 'added to' : 'removed from'} favourites!` });

      const { threadId, userId } = variables;
      await queryClient.refetchQueries(['thread-favourite', threadId, userId]);
    },
  });

  return { mutateAsync, isLoading };
};
