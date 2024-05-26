import React, { useState } from 'react';
import { ThreadCommentWithAuthor } from '@modules/community/types/community.types';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EditIcon,
  useToast,
} from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';

import CommunityThreadCommentManagementEditForm from './community-thread-comment-management-edit-form';
import { ThreadCommentPatchResponse } from '@modules/api/types/community-api.types';

import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { EditThreadCommentFormActionData } from '@modules/community/types/community-thread-comments-validations.types';

import { useThreadStore } from '@modules/community/state/thread/thread.slice';

interface CommunityThreadCommentManagementEditProps {
  comment: ThreadCommentWithAuthor;
}

const CommunityThreadCommentManagementEdit: React.FC<CommunityThreadCommentManagementEditProps> = (props) => {
  const { comment } = props;

  const { toast } = useToast();
  const { thread } = useThreadStore();
  const { queryClient } = useQueriesStore();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutateAsync } = useMutation<ThreadCommentPatchResponse, Error, EditThreadCommentFormActionData>({
    mutationKey: ['thread-comment-edit', comment.id],
    mutationFn: async (data) => {
      try {
        const url = new URL('/api/community/thread/comment', __URL__);
        const body = JSON.stringify({
          commentId: comment.id,
          content: data.content,
        });

        const response = await fetch(url, { method: 'PATCH', body });
        if (!response.ok) {
          throw new Error('Could not update thread comment!');
        }

        return response.json();
      } catch (error) {
        let errorMessage = 'Could not update thread comment!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      } finally {
        setDialogOpen(false);
      }
    },
    async onSuccess(data) {
      if (data && data.success && thread) {
        await queryClient.refetchQueries(['thread-comments', 0, thread.id]);
        toast({ variant: 'success', content: `Comment updated successfully!` });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Update Comment" size="sm" variant="outline">
          <EditIcon className="mr-2 stroke-current" />
          Update Comment
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Comment</DialogTitle>
          <DialogDescription>Update your comment details here..</DialogDescription>
        </DialogHeader>

        <CommunityThreadCommentManagementEditForm onSubmit={mutateAsync} comment={comment} />
      </DialogContent>
    </Dialog>
  );
};

export default CommunityThreadCommentManagementEdit;
