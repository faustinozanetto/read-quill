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

  const { deleteComment, isLoading } = useDeleteThreadComment({
    onSuccess: async (data) => {
      if (data && data.success && thread) {
        await queryClient.refetchQueries(['thread-comments', 0, thread.id]);
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
            disabled={isLoading}
            onClick={async (e) => {
              e.preventDefault();
              if (!comment) return;

              await deleteComment({ commentId: comment.id });
            }}
          >
            {isLoading && <LoadingIcon className="mr-2" />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommunityThreadCommentManagementDelete;
