import React from 'react';
import { ThreadCommentWithAuthor } from '@modules/community/types/community.types';
import { DeleteIcon, useToast } from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { ThreadCommentDeleteResponse } from '@modules/api/types/community-api.types';
import { useCommunityThreadStore } from '@modules/community/state/community-thread.slice';
import { useQueriesStore } from '@modules/queries/state/queries.slice';

interface CommunityThreadCommentManagementDeleteProps {
  comment: ThreadCommentWithAuthor;
}

const CommunityThreadCommentManagementDelete: React.FC<CommunityThreadCommentManagementDeleteProps> = (props) => {
  const { comment } = props;

  const { toast } = useToast();
  const { queryClient } = useQueriesStore();
  const { thread } = useCommunityThreadStore();

  const { mutateAsync } = useMutation<ThreadCommentDeleteResponse, Error>({
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
    onSuccess: (data) => {
      if (data && data.success && thread) {
        queryClient.refetchQueries(['thread-comments', 0, thread.id]);
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
