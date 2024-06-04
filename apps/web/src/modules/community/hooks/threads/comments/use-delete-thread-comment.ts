import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { ThreadCommentDeleteResponse } from '@modules/api/types/community-api.types';
import { DeleteThreadCommentFormActionData } from '@modules/community/types/community-thread-comments-validations.types';

type DeleteThreadCommentMutationResult = UseMutationResult<
  ThreadCommentDeleteResponse,
  Error,
  DeleteThreadCommentFormActionData
>;
type DeleteThreadCommentMutationParams = UseMutationOptions<
  ThreadCommentDeleteResponse,
  Error,
  DeleteThreadCommentFormActionData
>;

interface UseDeleteThreadCommentReturn {
  deleteComment: DeleteThreadCommentMutationResult['mutateAsync'];
  isLoading: DeleteThreadCommentMutationResult['isLoading'];
}

interface UseDeleteThreadCommentParams {
  onSuccess: NonNullable<DeleteThreadCommentMutationParams['onSuccess']>;
}

export const useDeleteThreadComment = (params: UseDeleteThreadCommentParams): UseDeleteThreadCommentReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync, isLoading } = useMutation<ThreadCommentDeleteResponse, Error, DeleteThreadCommentFormActionData>(
    {
      mutationKey: ['thread-delete-comment'],
      mutationFn: async (data) => {
        const url = new URL('/api/community/thread/comment', __URL__);
        const body = JSON.stringify({
          ...data,
        });

        const response = await fetch(url, { method: 'DELETE', body });
        if (!response.ok) {
          throw new Error('Could not delete comment!');
        }

        return response.json();
      },
      onSuccess,
      onError(error) {
        toast({ variant: 'error', content: error.message });
      },
    }
  );

  return {
    deleteComment: mutateAsync,
    isLoading,
  };
};
