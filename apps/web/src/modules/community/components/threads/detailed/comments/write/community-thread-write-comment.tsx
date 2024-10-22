'use client';

import React from 'react';
import CommunityThreadWriteCommentForm from './community-thread-write-comment-form';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useToast } from '@read-quill/design-system';

import { useThreadStore } from '@modules/community/state/thread/thread.slice';
import { useCreateThreadComment } from '@modules/community/hooks/threads/comments/use-create-thread-comment';
import { useQueryClient } from '@tanstack/react-query';

const CommunityThreadWriteComment: React.FC = () => {
  const { toast } = useToast();
  const { thread } = useThreadStore();
  const queryClient = useQueryClient();

  const { createComment } = useCreateThreadComment({
    thread,
    onSuccess: async (data) => {
      if (data?.data?.threadComment && thread) {
        await queryClient.refetchQueries({ queryKey: ['thread-comments', 0, thread.id] });
        toast({ variant: 'success', content: `Comment created successfully!` });
      }
    },
  });

  return (
    <div className="p-4 border rounded-lg flex flex-col">
      <CommunityThreadWriteCommentForm onSubmit={createComment} />
    </div>
  );
};

export default CommunityThreadWriteComment;
