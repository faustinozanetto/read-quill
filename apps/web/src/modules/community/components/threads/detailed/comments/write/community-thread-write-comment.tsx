'use client';

import React from 'react';
import CommunityThreadWriteCommentForm, {
  CommunityThreadWriteCommentFormData,
} from './community-thread-write-comment-form';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import { ThreadCommentPostResponse } from '@modules/api/types/community-api.types';
import { useCommunityThreadStore } from '@modules/community/state/community-thread.slice';
import { useQueriesStore } from '@modules/queries/state/queries.slice';

const CommunityThreadWriteComment: React.FC = () => {
  const { toast } = useToast();
  const { thread } = useCommunityThreadStore();
  const { queryClient } = useQueriesStore();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: CommunityThreadWriteCommentFormData) => {
      try {
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

        return response.json() as Promise<ThreadCommentPostResponse>;
      } catch (error) {
        let errorMessage = 'Could not create thread comment!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
    onSuccess(data) {
      if (data && data.success && thread) {
        queryClient.refetchQueries(['thread-comments', 0, thread.id]);
        toast({ variant: 'success', content: `Comment created successfully!` });
      }
    },
  });

  return (
    <div className="p-4 border rounded-lg shadow flex flex-col">
      <CommunityThreadWriteCommentForm onSubmit={mutateAsync} />
    </div>
  );
};

export default CommunityThreadWriteComment;
