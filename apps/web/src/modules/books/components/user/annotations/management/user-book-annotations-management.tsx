import React from 'react';
import AnnotationCreate from '@modules/annotations/components/create/annotation-create';
import { PlusIcon, Button, ManageIcon } from '@read-quill/design-system';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

interface UserBookAnnotationsManagement {
  bookId: string;
  showManageLink?: boolean;
}

const UserBookAnnotationsManagement: React.FC<UserBookAnnotationsManagement> = (props) => {
  const { bookId, showManageLink = true } = props;

  const queryClient = useQueryClient();

  const handleOnAnnotationCreated = async () => {
    await queryClient.refetchQueries({ queryKey: ['book-annotations', bookId] });
  };

  return (
    <div className="flex gap-2">
      <AnnotationCreate
        bookId={bookId}
        createButton={
          <Button aria-label="Create Annotation" size="sm" variant="outline" className="h-10">
            <PlusIcon className="mr-2 stroke-current" />
            Create
          </Button>
        }
        onSuccess={handleOnAnnotationCreated}
      />
      {showManageLink && (
        <Button asChild size="icon" variant="outline">
          <Link href={`/books/${bookId}/annotations`} title="Manage Annotations">
            <ManageIcon />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default UserBookAnnotationsManagement;
