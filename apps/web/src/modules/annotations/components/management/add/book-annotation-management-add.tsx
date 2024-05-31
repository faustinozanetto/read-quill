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
  useToast,
} from '@read-quill/design-system';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { __URL__ } from '@modules/common/lib/common.constants';

import BookAnnotationManagementAddForm from './book-annotation-management-add-form';
import { useBookStore } from '@modules/books/state/book.slice';
import { useCreateBookAnnotation } from '@modules/annotations/hooks/use-create-book-annotation';

const BookAnnotationManagementAdd: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();
  const { toast } = useToast();

  const { createAnnotation } = useCreateBookAnnotation({
    book,
    onSuccess: async (data) => {
      if (data.annotation && book) {
        await queryClient.refetchQueries(['book-annotations', book.id]);
        setDialogOpen(false);
        toast({ variant: 'success', content: `Book annotation added successfully!` });
      }
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

        <BookAnnotationManagementAddForm onSubmit={createAnnotation} />
      </DialogContent>
    </Dialog>
  );
};

export default BookAnnotationManagementAdd;
