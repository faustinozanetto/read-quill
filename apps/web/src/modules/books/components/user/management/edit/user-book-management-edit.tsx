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
  EditIcon,
} from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import { useBookStore } from '@modules/books/state/book.slice';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { __URL__ } from '@modules/common/lib/common.constants';
import type { UserBookManagementEditFormData } from './user-book-management-edit-form';
import UserBookManagementEditForm from './user-book-management-edit-form';

const UserBookManagementEdit: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: UserBookManagementEditFormData) => {
      if (!book) return;

      try {
        const url = new URL('/api/books', __URL__);
        const body = JSON.stringify({
          bookId: book.id,
          ...data,
        });

        const response = await fetch(url, { method: 'PATCH', body });
        if (!response.ok) {
          throw new Error('Could not updated book review!');
        }

        toast({ variant: 'success', content: `Book review updated successfully!` });
      } catch (error) {
        let errorMessage = 'Could not updated book review!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      } finally {
        setDialogOpen(false);
      }
    },
    onSuccess: () => {
      if (!book) return;

      queryClient.invalidateQueries(['book-page', book.id]);
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Update Book">
          <EditIcon className="mr-2 stroke-current" />
          Update Book
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
          <DialogDescription>Update your book details here..</DialogDescription>
        </DialogHeader>

        <UserBookManagementEditForm onSubmit={mutateAsync} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookManagementEdit;
