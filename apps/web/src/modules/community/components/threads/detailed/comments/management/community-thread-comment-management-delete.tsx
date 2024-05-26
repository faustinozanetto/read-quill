import React from 'react';
import { ThreadCommentWithAuthor } from '@modules/community/types/community.types';
import { DeleteIcon, useToast } from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { ThreadCommentDeleteResponse } from '@modules/api/types/community-api.types';

import { useQueriesStore } from '@modules/queries/state/queries.slice';

import { useThreadStore } from '@modules/community/state/thread/thread.slice';

interface CommunityThreadCommentManagementDeleteProps {
  comment: ThreadCommentWithAuthor;
}

const CommunityThreadCommentManagementDelete: React.FC<CommunityThreadCommentManagementDeleteProps> = (props) => {
  const { comment } = props;

  const { toast } = useToast();
  const { queryClient } = useQueriesStore();
  const { thread } = useThreadStore();

  const { mutateAsync } = useMutation<ThreadCommentDeleteResponse, Error>({
    mutationKey: ['thread-comment-delete', comment.id],
    mutationFn: async () => {
      try {
        const url = new URL('/api/community/thread/comment', __URL__);
        const body = JSON.stringify({
          commentId: comment.id,
        });

        const response = await fetch(url, { method: 'DELETE', body });
        if (!response.ok) {
          throw new Error('Could not delete comment!');
        }

        return response.json();
      } catch (error) {
        let errorMessage = 'Could not delete comment!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
    onSuccess: async (data) => {
      if (data && data.success && thread) {
        await queryClient.refetchQueries(['thread-comments', 0, thread.id]);
        toast({ variant: 'success', content: `Comment deleted successfully!` });
      }
    },
  });

  return (
    <ManagementDeleteObject label="Delete Comment" onDeleted={mutateAsync} variant="outline-destructive" size="sm">
      <DeleteIcon className="stroke-current mr-2" /> Delete Comment
    </ManagementDeleteObject>
  );
};

export default CommunityThreadCommentManagementDelete;
