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
import type { UserBookReviewManagementEditFormData } from './user-book-review-management-edit-form';
import UserBookReviewManagementEditForm from './user-book-review-management-edit-form';

const UserBookReviewManagementEdit: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: UserBookReviewManagementEditFormData) => {
      if (!book) return;

      try {
        const url = new URL('/api/books/review', __URL__);
        const body = JSON.stringify({
          bookId: book.id,
          review: data.review,
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
    onSuccess: async () => {
      if (!book) return;

      await queryClient.invalidateQueries(['book-page', book.id]);
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Update Review">
          <EditIcon className="mr-2 stroke-current" />
          Update Review
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Review</DialogTitle>
          <DialogDescription>Update your personal review of the book.</DialogDescription>
        </DialogHeader>

        <UserBookReviewManagementEditForm onSubmit={mutateAsync} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookReviewManagementEdit;
