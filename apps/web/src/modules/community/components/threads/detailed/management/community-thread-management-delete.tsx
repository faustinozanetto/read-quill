import React from 'react';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import { DeleteIcon, useToast } from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { ThreadDeleteResponse } from '@modules/api/types/community-api.types';
import { useRouter } from 'next/navigation';

interface CommunityThreadManagementDeleteProps {
  thread: ThreadWithDetails;
}

const CommunityThreadManagementDelete: React.FC<CommunityThreadManagementDeleteProps> = (props) => {
  const { thread } = props;

  const { toast } = useToast();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      try {
        const url = new URL('/api/community/thread', __URL__);
        const body = JSON.stringify({
          threadId: thread.id,
        });

        const response = await fetch(url, { method: 'DELETE', body });
        if (!response.ok) {
          throw new Error('Could not delete thread!');
        }

        return response.json() as Promise<ThreadDeleteResponse>;
      } catch (error) {
        let errorMessage = 'Could not delete thread!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
    onSuccess: (data) => {
      if (data && data.success && thread) {
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
