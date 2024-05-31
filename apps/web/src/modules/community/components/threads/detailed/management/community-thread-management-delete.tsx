'use client';

import React from 'react';

import { DeleteIcon, useToast } from '@read-quill/design-system';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { useRouter } from 'next/navigation';

import { useThreadStore } from '@modules/community/state/thread/thread.slice';
import { useDeleteThread } from '@modules/community/hooks/threads/use-delete-thread';

const CommunityThreadManagementDelete: React.FC = () => {
  const router = useRouter();
  const { thread } = useThreadStore();
  const { toast } = useToast();

  const { deleteThread } = useDeleteThread({
    thread,
    onSuccess: async (data) => {
      if (data && data.success) {
        toast({ variant: 'success', content: `Thread deleted successfully!` });
        router.push('/community');
      }
    },
  });

  return (
    <ManagementDeleteObject label="Delete Thread" onDeleted={deleteThread} variant="outline-destructive" size="sm">
      <DeleteIcon className="stroke-current mr-2" /> Delete Thread
    </ManagementDeleteObject>
  );
};

export default CommunityThreadManagementDelete;
