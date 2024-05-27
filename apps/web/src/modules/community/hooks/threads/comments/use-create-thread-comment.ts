import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { ThreadCommentPostResponse } from '@modules/api/types/community-api.types';

import { CreateThreadCommentFormActionData } from '@modules/community/types/community-thread-comments-validations.types';
import { ThreadWithDetails } from '@modules/community/types/community.types';

type CreateThreadCommentMutationResult = UseMutationResult<
  ThreadCommentPostResponse,
  Error,
  CreateThreadCommentFormActionData
>;
type CreateThreadCommentMutationParams = UseMutationOptions<
  ThreadCommentPostResponse,
  Error,
  CreateThreadCommentFormActionData
>;

interface UseCreateThreadCommentReturn {
  createComment: CreateThreadCommentMutationResult['mutateAsync'];
}

interface UseCreateThreadCommentParams {
  thread: ThreadWithDetails | null;
  onSuccess: NonNullable<CreateThreadCommentMutationParams['onSuccess']>;
}

export const useCreateThreadComment = (params: UseCreateThreadCommentParams): UseCreateThreadCommentReturn => {
  const { thread, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ThreadCommentPostResponse, Error, CreateThreadCommentFormActionData>({
    mutationKey: ['thread-create-comment', thread?.id],
    mutationFn: async (data) => {
      if (!thread) return;

      const url = new URL('/api/community/thread/comment', __URL__);
      const body = JSON.stringify({
        threadId: thread.id,
        content: data.content,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not create thread comment!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    createComment: mutateAsync,
  };
};
