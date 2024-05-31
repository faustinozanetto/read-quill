import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { ThreadDeleteResponse } from '@modules/api/types/community-api.types';
import { ThreadWithDetails } from '@modules/community/types/community.types';

interface UseDeleteThreadReturn {
  deleteThread: UseMutationResult<ThreadDeleteResponse, Error, void>['mutateAsync'];
}

interface UseDeleteThreadParams {
  thread: ThreadWithDetails | null;
  onSuccess: NonNullable<UseMutationOptions<ThreadDeleteResponse, Error, void>['onSuccess']>;
}

export const useDeleteThread = (params: UseDeleteThreadParams): UseDeleteThreadReturn => {
  const { thread, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ThreadDeleteResponse, Error, void>({
    mutationKey: ['thread-delete', thread?.id],
    mutationFn: async () => {
      if (!thread) return;

      const url = new URL('/api/community/thread', __URL__);
      const body = JSON.stringify({
        threadId: thread.id,
      });

      const response = await fetch(url, { method: 'DELETE', body });
      if (!response.ok) {
        throw new Error('Could not delete thread!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    deleteThread: mutateAsync,
  };
};
