import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';
import { ThreadDeleteResponse } from '@modules/api/types/community-api.types';
import { DeleteThreadApiActionData } from '@modules/community/types/community-thread-validations.types';

type DeleteThreadMutationResult = UseMutationResult<ThreadDeleteResponse, Error, DeleteThreadApiActionData>;
type DeleteThreadMutationParams = UseMutationOptions<ThreadDeleteResponse, Error, DeleteThreadApiActionData>;

interface UseDeleteThreadReturn {
  deleteThread: DeleteThreadMutationResult['mutateAsync'];
  isLoading: DeleteThreadMutationResult['isLoading'];
}

interface UseDeleteThreadParams {
  onSuccess: DeleteThreadMutationParams['onSuccess'];
}

export const useDeleteThread = (params: UseDeleteThreadParams): UseDeleteThreadReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isLoading } = useMutation<ThreadDeleteResponse, Error, DeleteThreadApiActionData>({
    mutationKey: ['delete-thread'],
    mutationFn: async (data) => {
      const url = new URL('/api/community/thread', __URL__);
      const body = JSON.stringify({
        ...data,
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
    isLoading,
  };
};
