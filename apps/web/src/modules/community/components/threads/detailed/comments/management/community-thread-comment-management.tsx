import React from 'react';
import { ThreadCommentWithAuthor } from '@modules/community/types/community.types';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ManageIcon,
} from '@read-quill/design-system';
import CommunityThreadCommentManagementDelete from './community-thread-comment-management-delete';
import CommunityThreadCommentManagementEdit from './edit/community-thread-comment-management-edit';

interface CommunityThreadCommentManagementProps {
  comment: ThreadCommentWithAuthor;
}

const CommunityThreadCommentManagement: React.FC<CommunityThreadCommentManagementProps> = (props) => {
  const { comment } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <ManageIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2" side="left">
        <DropdownMenuLabel className="p-1">Manage Comment</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-1">
          <CommunityThreadCommentManagementEdit comment={comment} />
          <CommunityThreadCommentManagementDelete comment={comment} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommunityThreadCommentManagement;
