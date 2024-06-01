import React from 'react';
import type { Annotation } from '@read-quill/database';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  ManageIcon,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  EditIcon,
  DeleteIcon,
  ButtonProps,
  Button,
} from '@read-quill/design-system';

import AnnotationEdit from '../edit/annotation-edit';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import AnnotationDelete from '../delete/annotation-delete';

interface AnnotationManagementProps extends ButtonProps {
  annotation: Annotation;
}

const AnnotationManagement: React.FC<AnnotationManagementProps> = (props) => {
  const { annotation, size = 'icon', variant = 'outline', ...rest } = props;

  const { queryClient } = useQueriesStore();

  const handleOnAnnotationChanged = async () => {
    await queryClient.refetchQueries(['book-annotations', annotation.bookId]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={size} variant={variant} {...rest}>
          <ManageIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuLabel>Manage Annotation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AnnotationEdit
          annotation={annotation}
          onSuccess={handleOnAnnotationChanged}
          editButton={
            <DropdownMenuItem aria-label="Update Annotation" onSelect={(e) => e.preventDefault()}>
              <EditIcon className="mr-2 stroke-current" />
              Update
            </DropdownMenuItem>
          }
        />
        <AnnotationDelete
          annotationId={annotation.id}
          onSuccess={handleOnAnnotationChanged}
          deleteButton={
            <DropdownMenuItem
              className="focus:bg-destructive focus:text-destructive-foreground"
              onSelect={(e) => e.preventDefault()}
            >
              <DeleteIcon className="mr-2 stroke-current" />
              Delete
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AnnotationManagement;
