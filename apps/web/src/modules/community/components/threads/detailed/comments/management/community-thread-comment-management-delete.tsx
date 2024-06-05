import React from 'react';
import { ThreadCommentWithAuthor } from '@modules/community/types/community.types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  DeleteIcon,
  DropdownMenuItem,
  LoadingIcon,
  buttonVariants,
  useToast,
} from '@read-quill/design-system';

import { useThreadStore } from '@modules/community/state/thread/thread.slice';
import { useDeleteThreadComment } from '@modules/community/hooks/threads/comments/use-delete-thread-comment';
import { useQueryClient } from '@tanstack/react-query';

interface CommunityThreadCommentManagementDeleteProps {
  comment: ThreadCommentWithAuthor;
}

const CommunityThreadCommentManagementDelete: React.FC<CommunityThreadCommentManagementDeleteProps> = (props) => {
  const { comment } = props;

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { thread } = useThreadStore();

  const { deleteComment, isPending } = useDeleteThreadComment({
    onSuccess: async (data) => {
      if (data.data?.success && thread) {
        await queryClient.refetchQueries({ queryKey: ['thread-comments', 0, thread.id] });
        toast({ variant: 'success', content: `Comment deleted successfully!` });
      }
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="focus:bg-destructive focus:text-destructive-foreground"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteIcon className="mr-2 stroke-current" />
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Coment</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete it?. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            disabled={isPending}
            onClick={async (e) => {
              e.preventDefault();
              if (!comment) return;

              await deleteComment({ commentId: comment.id });
            }}
          >
            {isPending && <LoadingIcon className="mr-2" />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommunityThreadCommentManagementDelete;
