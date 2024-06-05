import React from 'react';
import AnnotationCreate from '@modules/annotations/components/create/annotation-create';
import { PlusIcon, Button } from '@read-quill/design-system';
import { useQueryClient } from '@tanstack/react-query';

interface UserBookAnnotationsManagement {
  bookId: string;
}

const UserBookAnnotationsManagement: React.FC<UserBookAnnotationsManagement> = (props) => {
  const { bookId } = props;

  const queryClient = useQueryClient();

  const handleOnAnnotationCreated = async () => {
    await queryClient.refetchQueries({ queryKey: ['book-annotations', bookId] });
  };

  return (
    <AnnotationCreate
      bookId={bookId}
      createButton={
        <Button aria-label="Create Annotation" size="sm" variant="outline">
          <PlusIcon className="mr-2 stroke-current" />
          Create
        </Button>
      }
      onSuccess={handleOnAnnotationCreated}
    />
  );
};

export default UserBookAnnotationsManagement;
