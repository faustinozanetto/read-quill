import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { ThreadPatchResponse } from '@modules/api/types/community-api.types';
import { EditThreadFormActionData } from '@modules/community/types/community-thread-validations.types';
import { ThreadWithDetails } from '@modules/community/types/community.types';

interface UseEditThreadReturn {
  editThread: UseMutationResult<ThreadPatchResponse, Error, EditThreadFormActionData>['mutateAsync'];
}

interface UseEditThreadParams {
  thread: ThreadWithDetails | null;
  onSuccess: NonNullable<UseMutationOptions<ThreadPatchResponse, Error, EditThreadFormActionData>['onSuccess']>;
}

export const useEditThread = (params: UseEditThreadParams): UseEditThreadReturn => {
  const { thread, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ThreadPatchResponse, Error, EditThreadFormActionData>({
    mutationKey: ['thread-edit', thread?.id],
    mutationFn: async (data) => {
      if (!thread) return;

      const url = new URL('/api/community/thread', __URL__);
      const body = JSON.stringify({
        threadId: thread.id,
        ...data,
      });

      const response = await fetch(url, { method: 'PATCH', body });
      if (!response.ok) {
        throw new Error('Could not update thread!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    editThread: mutateAsync,
  };
};
