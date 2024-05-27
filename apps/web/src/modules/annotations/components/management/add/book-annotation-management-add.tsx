import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  PlusIcon,
} from '@read-quill/design-system';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { __URL__ } from '@modules/common/lib/common.constants';

import BookAnnotationManagementAddForm from './book-annotation-management-add-form';
import { useBookStore } from '@modules/books/state/book.slice';
import { useBookAnnotationAdd } from '@modules/annotations/hooks/use-book-annotation-add';

const BookAnnotationManagementAdd: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();

  const { addAnnotation } = useBookAnnotationAdd({
    onSuccess: async (data) => {
      if (data.annotation && book) await queryClient.refetchQueries(['book-annotations', book.id]);
      setDialogOpen(false);
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Add Annotation" size="sm" variant="outline">
          <PlusIcon className="mr-2 stroke-current" />
          Add
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Annotation</DialogTitle>
          <DialogDescription>Add a annotation of the book.</DialogDescription>
        </DialogHeader>

        <BookAnnotationManagementAddForm onSubmit={addAnnotation} />
      </DialogContent>
    </Dialog>
  );
};

export default BookAnnotationManagementAdd;
