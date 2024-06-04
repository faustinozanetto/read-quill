'use client';

import React from 'react';

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
import { useRouter } from 'next/navigation';

import { useThreadStore } from '@modules/community/state/thread/thread.slice';
import { useDeleteThread } from '@modules/community/hooks/threads/use-delete-thread';

const CommunityThreadManagementDelete: React.FC = () => {
  const router = useRouter();
  const { thread } = useThreadStore();
  const { toast } = useToast();

  const { deleteThread, isLoading } = useDeleteThread({
    onSuccess: async (data) => {
      if (data && data.success) {
        router.push('/community');
        toast({ variant: 'success', content: `Thread deleted successfully!` });
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
          <AlertDialogTitle>Delete Thread</AlertDialogTitle>
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
              if (!thread) return;

              await deleteThread({ threadId: thread.id });
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

export default CommunityThreadManagementDelete;
