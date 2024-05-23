import React from 'react';
import { DeleteIcon, useToast } from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { ThreadAttachmentDeleteResponse, ThreadDeleteResponse } from '@modules/api/types/community-api.types';
import { ThreadAttachment } from '@read-quill/database';
import { useQueriesStore } from '@modules/queries/state/queries.slice';

interface CommunityThreadAttachmentManagementDeleteProps {
  attachment: ThreadAttachment;
  threadId: string;
}

const CommunityThreadAttachmentManagementDelete: React.FC<CommunityThreadAttachmentManagementDeleteProps> = (props) => {
  const { attachment, threadId } = props;

  const { toast } = useToast();
  const { queryClient } = useQueriesStore();

  const { mutateAsync } = useMutation<ThreadAttachmentDeleteResponse>({
    mutationFn: async () => {
      try {
        const url = new URL('/api/community/thread/attachment', __URL__);
        const body = JSON.stringify({
          attachmentId: attachment.id,
        });

        const response = await fetch(url, { method: 'DELETE', body });
        if (!response.ok) {
          throw new Error('Could not delete attachment!');
        }

        return response.json();
      } catch (error) {
        let errorMessage = 'Could not delete attachment!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
    onSuccess: async (data) => {
      if (data && data.success) {
        await queryClient.refetchQueries(['thread-attachments', threadId]);
        toast({ variant: 'success', content: `Thread attachment deleted successfully!` });
      }
    },
  });

  return (
    <ManagementDeleteObject label="Delete Attachment" onDeleted={mutateAsync} variant="outline-destructive" size="sm">
      <DeleteIcon className="stroke-current mr-2" /> Delete Attachment
    </ManagementDeleteObject>
  );
};

export default CommunityThreadAttachmentManagementDelete;
