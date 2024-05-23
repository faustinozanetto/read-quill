import { ThreadAttachment } from '@read-quill/database';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ManageIcon,
} from '@read-quill/design-system';
import React from 'react';
import CommunityThreadAttachmentManagementDelete from './community-thread-attachment-management-delete';

interface CommunityThreadAttachmentManagementProps {
  attachment: ThreadAttachment;
  threadId: string;
}

const CommunityThreadAttachmentManagement: React.FC<CommunityThreadAttachmentManagementProps> = (props) => {
  const { attachment, threadId } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <ManageIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 mt-4" side="left">
        <DropdownMenuLabel className="p-1">Manage Attachment</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-1">
          <CommunityThreadAttachmentManagementDelete attachment={attachment} threadId={threadId} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommunityThreadAttachmentManagement;
