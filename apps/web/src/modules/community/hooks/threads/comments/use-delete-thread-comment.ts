import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { ThreadCommentWithAuthor } from '@modules/community/types/community.types';
import { ThreadCommentDeleteResponse } from '@modules/api/types/community-api.types';

type DeleteThreadCommentMutationResult = UseMutationResult<ThreadCommentDeleteResponse, Error, void>;
type DeleteThreadCommentMutationParams = UseMutationOptions<ThreadCommentDeleteResponse, Error, void>;

interface UseDeleteThreadCommentReturn {
  deleteComment: DeleteThreadCommentMutationResult['mutateAsync'];
}

interface UseDeleteThreadCommentParams {
  comment: ThreadCommentWithAuthor;
  onSuccess: NonNullable<DeleteThreadCommentMutationParams['onSuccess']>;
}

export const useDeleteThreadComment = (params: UseDeleteThreadCommentParams): UseDeleteThreadCommentReturn => {
  const { comment, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ThreadCommentDeleteResponse, Error, void>({
    mutationKey: ['thread-delete-comment', comment.id],
    mutationFn: async () => {
      const url = new URL('/api/community/thread/comment', __URL__);
      const body = JSON.stringify({
        commentId: comment.id,
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
  });

  return {
    deleteComment: mutateAsync,
  };
};
