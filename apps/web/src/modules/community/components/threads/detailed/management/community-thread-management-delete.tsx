'use client';

import React from 'react';

import { DeleteIcon, useToast } from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { ThreadDeleteResponse } from '@modules/api/types/community-api.types';
import { useRouter } from 'next/navigation';

import { useThreadStore } from '@modules/community/state/thread/thread.slice';

const CommunityThreadManagementDelete: React.FC = () => {
  const router = useRouter();
  const { thread } = useThreadStore();
  const { toast } = useToast();

  const { mutateAsync } = useMutation<ThreadDeleteResponse, Error>({
    mutationKey: ['thread-delete', thread?.id],
    mutationFn: async () => {
      try {
        if (!thread) return;

        const url = new URL('/api/community/thread', __URL__);
        const body = JSON.stringify({
          threadId: thread.id,
        });

        const response = await fetch(url, { method: 'DELETE', body });
        if (!response.ok) {
          throw new Error('Could not delete thread!');
        }

        return response.json();
      } catch (error) {
        let errorMessage = 'Could not delete thread!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
    onSuccess: (data) => {
      if (data && data.success) {
        toast({ variant: 'success', content: `Thread deleted successfully!` });
        router.push('/community');
      }
    },
  });

  return (
    <ManagementDeleteObject label="Delete Thread" onDeleted={mutateAsync} variant="outline-destructive" size="sm">
      <DeleteIcon className="stroke-current mr-2" /> Delete Thread
    </ManagementDeleteObject>
  );
};

export default CommunityThreadManagementDelete;
