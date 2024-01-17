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
import { useBookStore } from '@modules/books/state/book.slice';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { UserBookAnnotationManagementAddFormData } from './user-book-annotations-management-add-form';
import UserBookAnnotationManagementAddForm from './user-book-annotations-management-add-form';

const UserBookAnnotationManagementAdd: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: UserBookAnnotationManagementAddFormData) => {
      if (!book) return;

      try {
        const url = new URL('/api/books/annotations', __URL__);
        const body = JSON.stringify({
          bookId: book.id,
          ...data,
        });

        const response = await fetch(url, { method: 'POST', body });
        if (!response.ok) {
          throw new Error('Could not add book annotation!');
        }

        toast({ variant: 'success', content: `Book annotation added successfully!` });
      } catch (error) {
        let errorMessage = 'Could not add book annotation!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      } finally {
        setDialogOpen(false);
      }
    },
    onSuccess: async () => {
      if (!book) return;

      await queryClient.invalidateQueries(['book-annotations', book.id]);
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Add Annotation">
          <EditIcon className="mr-2 stroke-current" />
          Add Annotation
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Annotation</DialogTitle>
          <DialogDescription>Add a annotation of the book.</DialogDescription>
        </DialogHeader>

        <UserBookAnnotationManagementAddForm onSubmit={mutateAsync} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookAnnotationManagementAdd;
