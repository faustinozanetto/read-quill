import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query';

import { ThreadCommentReplyPostResponse } from '@modules/api/types/community-api.types';

import { ReplyThreadCommentFormActionData } from '@modules/community/types/community-thread-comments-validations.types';
import { ThreadCommentWithAuthor, ThreadWithDetails } from '@modules/community/types/community.types';

type ReplyThreadCommentMutationResult = UseMutationResult<
  ThreadCommentReplyPostResponse,
  Error,
  ReplyThreadCommentFormActionData
>;
type ReplyThreadCommentMutationParams = UseMutationOptions<
  ThreadCommentReplyPostResponse,
  Error,
  ReplyThreadCommentFormActionData
>;

interface UseReplyThreadCommentReturn {
  replyComment: ReplyThreadCommentMutationResult['mutateAsync'];
}

interface UseReplyThreadCommentParams {
  thread: ThreadWithDetails | null;
  comment: ThreadCommentWithAuthor;
  onSuccess: NonNullable<ReplyThreadCommentMutationParams['onSuccess']>;
}

export const useReplyThreadComment = (params: UseReplyThreadCommentParams): UseReplyThreadCommentReturn => {
  const { thread, comment, onSuccess } = params;

  const { toast } = useToast();

  const { mutateAsync } = useMutation<ThreadCommentReplyPostResponse, Error, ReplyThreadCommentFormActionData>({
    mutationKey: ['thread-reply-comment', thread?.id, comment.id],
    mutationFn: async (data) => {
      if (!thread) return;

      const url = new URL('/api/community/thread/comment/reply', __URL__);
      const body = JSON.stringify({
        commentId: comment.id,
        threadId: thread.id,
        content: data.content,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not create comment reply!');
      }

      return response.json();
    },
    onSuccess,
    onError(error) {
      toast({ variant: 'error', content: error.message });
    },
  });

  return {
    replyComment: mutateAsync,
  };
};
