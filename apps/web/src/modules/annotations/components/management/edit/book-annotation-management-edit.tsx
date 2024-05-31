import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  EditIcon,
  useToast,
} from '@read-quill/design-system';
import type { Annotation } from '@read-quill/database';
import { useQueriesStore } from '@modules/queries/state/queries.slice';

import BookAnnotationManagementEditForm from './book-annotation-management-edit-form';
import { useBookStore } from '@modules/books/state/book.slice';
import { useEditBookAnnotation } from '@modules/annotations/hooks/use-edit-book-annotation';

interface BookAnnotationManagementEditProps {
  annotation: Annotation;
}

const BookAnnotationManagementEdit: React.FC<BookAnnotationManagementEditProps> = (props) => {
  const { annotation } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();
  const { toast } = useToast();

  const { editAnnotation } = useEditBookAnnotation({
    annotation,
    onSuccess: async (data) => {
      if (data.annotation && book) {
        await queryClient.refetchQueries(['book-annotations', book.id]);
        setDialogOpen(false);
        toast({ variant: 'success', content: `Book annotation edited successfully!` });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Edit Annotation" size="icon" variant="outline">
          <EditIcon className="stroke-current" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Annotation</DialogTitle>
          <DialogDescription>Edit a annotation of the book.</DialogDescription>
        </DialogHeader>

        <BookAnnotationManagementEditForm annotation={annotation} onSubmit={editAnnotation} />
      </DialogContent>
    </Dialog>
  );
};

export default BookAnnotationManagementEdit;
