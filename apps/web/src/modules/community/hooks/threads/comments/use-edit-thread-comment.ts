import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { EditThreadCommentFormActionData } from '@modules/community/types/community-thread-comments-validations.types';
import { ThreadCommentWithAuthor } from '@modules/community/types/community.types';
import { ThreadCommentPatchResponse } from '@modules/api/types/community-api.types';

type EditThreadCommentMutationResult = UseMutationResult<
  ThreadCommentPatchResponse,
  Error,
  EditThreadCommentFormActionData
>;
type EditThreadCommentMutationParams = UseMutationOptions<
  ThreadCommentPatchResponse,
  Error,
  EditThreadCommentFormActionData
>;

interface UseEditThreadCommentReturn {
  editComment: EditThreadCommentMutationResult['mutateAsync'];
}

interface UseEditThreadCommentParams {
  comment: ThreadCommentWithAuthor;
  onSuccess: NonNullable<EditThreadCommentMutationParams['onSuccess']>;
}

export const useEditThreadComment = (params: UseEditThreadCommentParams): UseEditThreadCommentReturn => {
  const { comment, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ThreadCommentPatchResponse, Error, EditThreadCommentFormActionData>({
    mutationKey: ['thread-edit-comment', comment.id],
    mutationFn: async (data) => {
      const url = new URL('/api/community/thread/comment', __URL__);
      const body = JSON.stringify({
        commentId: comment.id,
        content: data.content,
      });

      const response = await fetch(url, { method: 'PATCH', body });
      if (!response.ok) {
        throw new Error('Could not edit thread comment!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    editComment: mutateAsync,
  };
};
