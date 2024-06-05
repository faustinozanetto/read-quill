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
  LoadingIcon,
} from '@read-quill/design-system';

import AnnotationEdit from '../edit/annotation-edit';
import AnnotationDelete from '../delete/annotation-delete';
import { useQueryClient } from '@tanstack/react-query';

interface AnnotationManagementProps extends ButtonProps {
  annotation: Annotation;
}

const AnnotationManagement: React.FC<AnnotationManagementProps> = (props) => {
  const { annotation, size = 'icon', variant = 'outline', ...rest } = props;

  const queryClient = useQueryClient();

  const handleOnAnnotationChanged = async () => {
    await queryClient.refetchQueries({ queryKey: ['book-annotations', annotation.bookId] });
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
          editButton={(isLoading) => (
            <DropdownMenuItem aria-label="Update Annotation" onSelect={(e) => e.preventDefault()} disabled={isLoading}>
              {isLoading ? <LoadingIcon className="mr-2" /> : <EditIcon className="mr-2 stroke-current" />}
              Update
            </DropdownMenuItem>
          )}
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
