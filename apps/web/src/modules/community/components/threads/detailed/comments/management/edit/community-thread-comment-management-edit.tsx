import React from 'react';
import { ThreadCommentWithAuthor } from '@modules/community/types/community.types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem,
  EditIcon,
  useToast,
} from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';

import CommunityThreadCommentManagementEditForm from './community-thread-comment-management-edit-form';

import { useQueriesStore } from '@modules/queries/state/queries.slice';

import { useThreadStore } from '@modules/community/state/thread/thread.slice';
import { useEditThreadComment } from '@modules/community/hooks/threads/comments/use-edit-thread-comment';

interface CommunityThreadCommentManagementEditProps {
  comment: ThreadCommentWithAuthor;
}

const CommunityThreadCommentManagementEdit: React.FC<CommunityThreadCommentManagementEditProps> = (props) => {
  const { comment } = props;

  const { toast } = useToast();
  const { thread } = useThreadStore();
  const { queryClient } = useQueriesStore();

  const { editComment } = useEditThreadComment({
    comment,
    onSuccess: async (data) => {
      if (data.threadComment && thread) {
        await queryClient.refetchQueries(['thread-comments', 0, thread.id]);
        toast({ variant: 'success', content: `Comment updated successfully!` });
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem aria-label="Update Comment" onSelect={(e) => e.preventDefault()}>
          <EditIcon className="mr-2 stroke-current" />
          Update
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Comment</DialogTitle>
          <DialogDescription>Update your comment details here..</DialogDescription>
        </DialogHeader>

        <CommunityThreadCommentManagementEditForm onSubmit={editComment} comment={comment} />
      </DialogContent>
    </Dialog>
  );
};

export default CommunityThreadCommentManagementEdit;
