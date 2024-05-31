'use client';

import React from 'react';
import CommunityThreadWriteCommentForm from './community-thread-write-comment-form';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';

import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { useThreadStore } from '@modules/community/state/thread/thread.slice';
import { useCreateThreadComment } from '@modules/community/hooks/threads/comments/use-create-thread-comment';

const CommunityThreadWriteComment: React.FC = () => {
  const { toast } = useToast();
  const { thread } = useThreadStore();
  const { queryClient } = useQueriesStore();

  const { createComment } = useCreateThreadComment({
    thread,
    onSuccess: async (data) => {
      if (data && data.success && thread) {
        await queryClient.refetchQueries(['thread-comments', 0, thread.id]);
        toast({ variant: 'success', content: `Comment created successfully!` });
      }
    },
  });

  return (
    <div className="p-4 border rounded-lg shadow flex flex-col">
      <CommunityThreadWriteCommentForm onSubmit={createComment} />
    </div>
  );
};

export default CommunityThreadWriteComment;
