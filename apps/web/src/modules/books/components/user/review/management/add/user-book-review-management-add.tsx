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
import type { UserBookReviewManagementAddFormData } from './user-book-review-management-add-form';
import UserBookReviewManagementAddForm from './user-book-review-management-add-form';

const UserBookReviewManagementAdd: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: UserBookReviewManagementAddFormData) => {
      if (!book) return;

      try {
        const url = new URL('/api/books/review', __URL__);
        const body = JSON.stringify({
          bookId: book.id,
          review: data.review,
        });

        const response = await fetch(url, { method: 'POST', body });
        if (!response.ok) {
          throw new Error('Could not add book review!');
        }

        toast({ variant: 'success', content: `Book review added successfully!` });
      } catch (error) {
        let errorMessage = 'Could not add book review!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      } finally {
        setDialogOpen(false);
      }
    },
    onSuccess: async () => {
      if (!book) return;

      await queryClient.refetchQueries(['book-page', book.id]);
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Add Review" size="sm" variant="outline">
          <EditIcon className="mr-2 stroke-current" />
          Add
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>Add your personal review of the book.</DialogDescription>
        </DialogHeader>

        <UserBookReviewManagementAddForm onSubmit={mutateAsync} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookReviewManagementAdd;
