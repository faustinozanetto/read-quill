import React from 'react';
import { DeleteIcon, useToast } from '@read-quill/design-system';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { ThreadAttachment } from '@read-quill/database';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { useThreadDeleteAttachment } from '@modules/community/hooks/threads/attachments/use-thread-delete-attachment';

interface CommunityThreadAttachmentManagementDeleteProps {
  attachment: ThreadAttachment;
  threadId: string;
}

const CommunityThreadAttachmentManagementDelete: React.FC<CommunityThreadAttachmentManagementDeleteProps> = (props) => {
  const { attachment, threadId } = props;

  const { toast } = useToast();
  const { queryClient } = useQueriesStore();

  const { deleteAttachment } = useThreadDeleteAttachment({
    attachment,
    onSuccess: async (data) => {
      if (data && data.success) {
        await queryClient.refetchQueries(['thread-attachments', threadId]);
        toast({ variant: 'success', content: `Thread attachment deleted successfully!` });
      }
    },
  });

  return (
    <ManagementDeleteObject
      label="Delete Attachment"
      onDeleted={deleteAttachment}
      variant="outline-destructive"
      size="sm"
    >
      <DeleteIcon className="stroke-current mr-2" /> Delete Attachment
    </ManagementDeleteObject>
  );
};

export default CommunityThreadAttachmentManagementDelete;
