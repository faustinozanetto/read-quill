import React from 'react';
import AnnotationCreate from '@modules/annotations/components/create/annotation-create';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { PlusIcon, Button } from '@read-quill/design-system';

interface UserBookAnnotationsManagement {
  bookId: string;
}

const UserBookAnnotationsManagement: React.FC<UserBookAnnotationsManagement> = (props) => {
  const { bookId } = props;

  const { queryClient } = useQueriesStore();

  const handleOnAnnotationCreated = async () => {
    await queryClient.refetchQueries(['book-annotations', bookId]);
  };

  return (
    <div className="flex flex-col gap-2">
      <AnnotationCreate
        bookId={bookId}
        createButton={
          <Button aria-label="Create Annotation" size="sm">
            <PlusIcon className="mr-2 stroke-current" />
            Create Annotation
          </Button>
        }
        onSuccess={handleOnAnnotationCreated}
      />
    </div>
  );
};

export default UserBookAnnotationsManagement;
