import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  useToast,
  PlusIcon,
} from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { __URL__ } from '@modules/common/lib/common.constants';

import BookAnnotationManagementAddForm from './book-annotation-management-add-form';
import { BookAnnotationPostResponse } from '@modules/api/types/books-api.types';
import { CreateAnnotationFormActionData } from '@modules/annotations/types/annotation-validations.types';
import { useBookStore } from '@modules/books/state/book.slice';

const BookAnnotationManagementAdd: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();

  const { mutateAsync } = useMutation<BookAnnotationPostResponse, Error, CreateAnnotationFormActionData>({
    mutationKey: ['book-annotation-add', book?.id],
    mutationFn: async (data) => {
      try {
        if (!book) return;

        const url = new URL('/api/annotations', __URL__);
        const body = JSON.stringify({
          bookId: book.id,
          ...data,
        });

        const response = await fetch(url, { method: 'POST', body });
        if (!response.ok) {
          throw new Error('Could not add book annotation!');
        }

        return response.json();
      } catch (error) {
        let errorMessage = 'Could not add book annotation!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      } finally {
        setDialogOpen(false);
      }
    },
    onSuccess: async (data) => {
      if (data && data.annotation && book) {
        await queryClient.refetchQueries(['book-annotations', book.id]);

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

        <BookAnnotationManagementAddForm onSubmit={mutateAsync} />
      </DialogContent>
    </Dialog>
  );
};

export default BookAnnotationManagementAdd;
