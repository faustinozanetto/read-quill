import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { ThreadFavouritePostResponse } from '@modules/api/types/community-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { useQueryClient } from '@tanstack/react-query';

interface UseSetThreadFavouriteReturn
  extends Pick<
    UseMutationResult<ThreadFavouritePostResponse, unknown, UseSetThreadFavouriteParams>,
    'mutateAsync' | 'isPending'
  > {}

interface UseSetThreadFavouriteParams {
  threadId: string;
  userId: string;
  currentThreadFavourite: boolean;
}

export const useSetThreadFavourite = (): UseSetThreadFavouriteReturn => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<ThreadFavouritePostResponse, Error, UseSetThreadFavouriteParams>({
    mutationFn: async (data) => {
      const { currentThreadFavourite, threadId } = data;

      const url = new URL('/api/community/thread/favourite', __URL__);
      const body = JSON.stringify({
        threadId,
        isFavourite: !currentThreadFavourite,
      });

      const response = await fetch(url, { method: 'POST', body });
      const responseData = (await response.json()) as ThreadFavouritePostResponse;

      if (!response.ok) {
        let errorMessage = response.statusText;
        if (responseData.error) errorMessage = responseData.error.message;

        throw new Error(errorMessage);
      }

      return responseData;
    },
    onError: (error) => {
      toast({ variant: 'error', content: error.message });
    },
    onSuccess: async (data, variables) => {
      if (!data.data) return;

      const { threadFavourite } = data.data;

      toast({ variant: 'success', content: `Thread ${threadFavourite ? 'added to' : 'removed from'} favourites!` });

      const { threadId, userId } = variables;
      await queryClient.refetchQueries({ queryKey: ['thread-favourite', threadId, userId] });
    },
  });

  return { mutateAsync, isPending };
};
