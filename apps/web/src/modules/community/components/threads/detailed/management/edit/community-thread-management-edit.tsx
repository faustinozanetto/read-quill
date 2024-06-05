'use client';

import React from 'react';

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

import CommunityThreadManagementEditForm from './community-thread-management-edit-form';
import { useThreadStore } from '@modules/community/state/thread/thread.slice';
import { useEditThread } from '@modules/community/hooks/threads/use-edit-thread';
import { useQueryClient } from '@tanstack/react-query';

const CommunityThreadManagementEdit: React.FC = () => {
  const { toast } = useToast();
  const { thread } = useThreadStore();
  const queryClient = useQueryClient();

  const { editThread } = useEditThread({
    thread,
    onSuccess: async (data) => {
      if (data?.data?.thread && thread) {
        await queryClient.refetchQueries({ queryKey: ['thread', thread.id] });

        toast({ variant: 'success', content: `Thread updated successfully!` });
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem aria-label="Update Thread" onSelect={(e) => e.preventDefault()}>
          <EditIcon className="mr-2 stroke-current" />
          Update
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Thread</DialogTitle>
          <DialogDescription>Update your thread details here..</DialogDescription>
        </DialogHeader>

        {thread && <CommunityThreadManagementEditForm onSubmit={editThread} thread={thread} />}
      </DialogContent>
    </Dialog>
  );
};

export default CommunityThreadManagementEdit;
