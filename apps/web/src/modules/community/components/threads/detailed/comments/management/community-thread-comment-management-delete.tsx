import React from 'react';
import { ThreadCommentWithAuthor } from '@modules/community/types/community.types';
import { DeleteIcon, useToast } from '@read-quill/design-system';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';

import { useQueriesStore } from '@modules/queries/state/queries.slice';

import { useThreadStore } from '@modules/community/state/thread/thread.slice';
import { useDeleteThreadComment } from '@modules/community/hooks/threads/comments/use-delete-thread-comment';

interface CommunityThreadCommentManagementDeleteProps {
  comment: ThreadCommentWithAuthor;
}

const CommunityThreadCommentManagementDelete: React.FC<CommunityThreadCommentManagementDeleteProps> = (props) => {
  const { comment } = props;

  const { toast } = useToast();
  const { queryClient } = useQueriesStore();
  const { thread } = useThreadStore();

  const { deleteComment } = useDeleteThreadComment({
    comment,
    onSuccess: async (data) => {
      if (data && data.success && thread) {
        await queryClient.refetchQueries(['thread-comments', 0, thread.id]);
        toast({ variant: 'success', content: `Comment deleted successfully!` });
      }
    },
  });

  return (
    <ManagementDeleteObject label="Delete Comment" onDeleted={deleteComment} variant="outline-destructive" size="sm">
      <DeleteIcon className="stroke-current mr-2" /> Delete Comment
    </ManagementDeleteObject>
  );
};

export default CommunityThreadCommentManagementDelete;
