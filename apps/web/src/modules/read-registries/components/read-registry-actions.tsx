import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DotsHorizontalIcon,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DeleteIcon,
  EditIcon,
} from '@read-quill/design-system';
import type { ReadRegistry } from '@read-quill/database';
import ReadRegistryEdit from './edit/read-registry-edit';
import ReadRegistryDelete from './delete/read-registry-delete';
import { UseEditReadRegistryParams } from '../hooks/use-edit-read-registry';
import { UseDeleteReadRegistryParams } from '../hooks/use-delete-read-registry';

interface ReadRegistryActionsProps {
  readRegistry: ReadRegistry;
  onEdited: UseEditReadRegistryParams['onSuccess'];
  onDeleted: UseDeleteReadRegistryParams['onSuccess'];
}

const ReadRegistryActions: React.FC<ReadRegistryActionsProps> = (props) => {
  const { readRegistry, onEdited, onDeleted } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ReadRegistryEdit
          editButton={
            <DropdownMenuItem aria-label="Update Annotation" onSelect={(e) => e.preventDefault()}>
              <EditIcon className="mr-2 stroke-current" />
              Update
            </DropdownMenuItem>
          }
          readRegistry={readRegistry}
          onSuccess={onEdited}
        />
        <ReadRegistryDelete
          deleteButton={
            <DropdownMenuItem
              className="focus:bg-destructive focus:text-destructive-foreground"
              onSelect={(e) => e.preventDefault()}
            >
              <DeleteIcon className="mr-2 stroke-current" />
              Delete
            </DropdownMenuItem>
          }
          readRegistry={readRegistry}
          onSuccess={onDeleted}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReadRegistryActions;
