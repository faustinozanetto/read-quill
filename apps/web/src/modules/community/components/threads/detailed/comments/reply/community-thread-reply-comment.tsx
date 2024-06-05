'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  ArrowBackIcon,
  Button,
  useToast,
} from '@read-quill/design-system';
import CommunityThreadReplyCommentForm from './community-thread-reply-comment-form';

import { ThreadCommentWithAuthor } from '@modules/community/types/community.types';
import { useThreadStore } from '@modules/community/state/thread/thread.slice';
import { useReplyThreadComment } from '@modules/community/hooks/threads/comments/use-reply-thread-comment';
import { useQueryClient } from '@tanstack/react-query';

interface CommunityThreadReplyCommentProps {
  comment: ThreadCommentWithAuthor;
}

const CommunityThreadReplyComment: React.FC<CommunityThreadReplyCommentProps> = (props) => {
  const { comment } = props;

  const { toast } = useToast();
  const { thread } = useThreadStore();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { replyComment } = useReplyThreadComment({
    thread,
    comment,
    onSuccess: async (data) => {
      if (data?.data?.threadComment && thread) {
        await queryClient.refetchQueries({ queryKey: ['thread-comments', 0, thread.id] });
        setDialogOpen(false);
        toast({ variant: 'success', content: `Reply created successfully!` });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Reply Comment" size="sm" variant="ghost" className="h-8">
          <ArrowBackIcon className="mr-2 stroke-current" />
          Reply
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Reply</DialogTitle>
          <DialogDescription>Add your reply here..</DialogDescription>
        </DialogHeader>

        <CommunityThreadReplyCommentForm onSubmit={replyComment} />
      </DialogContent>
    </Dialog>
  );
};

export default CommunityThreadReplyComment;
