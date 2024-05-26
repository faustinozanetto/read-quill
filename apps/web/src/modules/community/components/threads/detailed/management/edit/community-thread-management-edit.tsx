'use client';

import React, { useState } from 'react';

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

import { ThreadPatchResponse } from '@modules/api/types/community-api.types';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import CommunityThreadManagementEditForm from './community-thread-management-edit-form';
import { EditThreadFormActionData } from '@modules/community/types/community-thread-validations.types';
import { useThreadStore } from '@modules/community/state/thread/thread.slice';

const CommunityThreadManagementEdit: React.FC = () => {
  const { toast } = useToast();
  const { thread } = useThreadStore();
  const { queryClient } = useQueriesStore();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutateAsync } = useMutation<ThreadPatchResponse, Error, EditThreadFormActionData>({
    mutationKey: ['thread-edit', thread?.id],
    mutationFn: async (data) => {
      try {
        if (!thread) return;

        const url = new URL('/api/community/thread', __URL__);
        const body = JSON.stringify({
          threadId: thread.id,
          ...data,
        });

        const response = await fetch(url, { method: 'PATCH', body });
        if (!response.ok) {
          throw new Error('Could not update thread!');
        }

        return response.json();
      } catch (error) {
        let errorMessage = 'Could not update thread!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      } finally {
        setDialogOpen(false);
      }
    },
    onSuccess(data) {
      if (data && data.success && thread) {
        queryClient.refetchQueries(['community-thread', thread.id]);
        toast({ variant: 'success', content: `Thread updated successfully!` });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Update Thread" size="sm" variant="outline">
          <EditIcon className="mr-2 stroke-current" />
          Update Thread
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Thread</DialogTitle>
          <DialogDescription>Update your thread details here..</DialogDescription>
        </DialogHeader>

        {thread && <CommunityThreadManagementEditForm onSubmit={mutateAsync} thread={thread} />}
      </DialogContent>
    </Dialog>
  );
};

export default CommunityThreadManagementEdit;
