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
import { useMutation } from '@tanstack/react-query';
import type { Annotation } from '@read-quill/database';
import { useBookStore } from '@modules/books/state/book.slice';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { BookAnnotationManagementEditFormData } from './book-annotation-management-edit-form';
import BookAnnotationManagementEditForm from './book-annotation-management-edit-form';

interface BookAnnotationManagementEditProps {
  annotation: Annotation;
}

const BookAnnotationManagementEdit: React.FC<BookAnnotationManagementEditProps> = (props) => {
  const { annotation } = props;

  const { toast } = useToast();
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();

  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: async (data: BookAnnotationManagementEditFormData) => {
      try {
        const url = new URL('/api/books/annotations', __URL__);
        const body = JSON.stringify({
          annotationId: annotation.id,
          ...data,
        });

        const response = await fetch(url, { method: 'PATCH', body });
        if (!response.ok) {
          throw new Error('Could not edit book annotation!');
        }

        toast({ variant: 'success', content: `Book annotation edited successfully!` });
      } catch (error) {
        let errorMessage = 'Could not edit book annotation!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      } finally {
        setDialogOpen(false);
      }
    },
    onSuccess: async () => {
      if (!book) return;

      await queryClient.refetchQueries(['book-annotations', book.id]);
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

        <BookAnnotationManagementEditForm annotation={annotation} onSubmit={mutateAsync} />
      </DialogContent>
    </Dialog>
  );
};

export default BookAnnotationManagementEdit;
