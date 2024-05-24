import React from 'react';
import UserBookManagementEdit from './edit/user-book-management-edit';
import UserBookManagementDelete from './delete/user-book-management-delete';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  ManageIcon,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  Button,
  ButtonProps,
} from '@read-quill/design-system';

interface UserBookManagementProps extends ButtonProps {}

const UserBookManagement: React.FC<UserBookManagementProps> = (props) => {
  const { size = 'icon', variant = 'outline', ...rest } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={size} variant={variant} {...rest}>
          <ManageIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 mt-4" side="left">
        <DropdownMenuLabel className="p-1">Manage Book</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-1">
          <UserBookManagementEdit />
          <UserBookManagementDelete />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBookManagement;
