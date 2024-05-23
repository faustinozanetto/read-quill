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
import { ThreadCommentReplyPostResponse } from '@modules/api/types/community-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useCommunityThreadStore } from '@modules/community/state/community-thread.slice';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { useMutation } from '@tanstack/react-query';
import { ThreadCommentWithAuthor } from '@modules/community/types/community.types';
import { ReplyThreadCommentFormActionData } from '@modules/community/types/community-thread-comments-validations.types';

interface CommunityThreadReplyCommentProps {
  comment: ThreadCommentWithAuthor;
}

const CommunityThreadReplyComment: React.FC<CommunityThreadReplyCommentProps> = (props) => {
  const { comment } = props;

  const { toast } = useToast();
  const { thread } = useCommunityThreadStore();
  const { queryClient } = useQueriesStore();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutateAsync } = useMutation<ThreadCommentReplyPostResponse, Error, ReplyThreadCommentFormActionData>({
    mutationFn: async (data) => {
      try {
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
      } catch (error) {
        let errorMessage = 'Could not create comment reply!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      } finally {
        setDialogOpen(false);
      }
    },
    onSuccess(data) {
      if (data && data.success && thread) {
        queryClient.refetchQueries(['thread-comments', 0, thread.id]);
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

        <CommunityThreadReplyCommentForm onSubmit={mutateAsync} />
      </DialogContent>
    </Dialog>
  );
};

export default CommunityThreadReplyComment;
