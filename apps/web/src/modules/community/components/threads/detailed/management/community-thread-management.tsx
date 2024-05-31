import React from 'react';
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
import CommunityThreadManagementEdit from './edit/community-thread-management-edit';
import CommunityThreadManagementDelete from './community-thread-management-delete';

const CommunityThreadManagement: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <ManageIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 mt-4" side="left">
        <DropdownMenuLabel className="p-1">Manage Thread</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-1">
          <CommunityThreadManagementEdit />
          <CommunityThreadManagementDelete />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommunityThreadManagement;
