import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import {
  EditThreadCommentApiActionData,
  EditThreadCommentFormActionData,
} from '@modules/community/types/community-thread-comments-validations.types';

import { ThreadCommentPatchResponse } from '@modules/api/types/community-api.types';

type EditThreadCommentMutationResult = UseMutationResult<
  ThreadCommentPatchResponse,
  Error,
  EditThreadCommentApiActionData
>;
type EditThreadCommentMutationParams = UseMutationOptions<
  ThreadCommentPatchResponse,
  Error,
  EditThreadCommentApiActionData
>;

interface UseEditThreadCommentReturn {
  editComment: EditThreadCommentMutationResult['mutateAsync'];
}

interface UseEditThreadCommentParams {
  onSuccess: NonNullable<EditThreadCommentMutationParams['onSuccess']>;
}

export const useEditThreadComment = (params: UseEditThreadCommentParams): UseEditThreadCommentReturn => {
  const { onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ThreadCommentPatchResponse, Error, EditThreadCommentApiActionData>({
    mutationKey: ['thread-edit-comment'],
    mutationFn: async (data) => {
      const url = new URL('/api/community/thread/comment', __URL__);
      const body = JSON.stringify({
        ...data,
      });

      const response = await fetch(url, { method: 'PATCH', body });
      const responseData = (await response.json()) as ThreadCommentPatchResponse;

      if (!response.ok) {
        let errorMessage = response.statusText;
        if (responseData.error) errorMessage = responseData.error.message;

        throw new Error(errorMessage);
      }

      return responseData;
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
