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
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { __URL__ } from '@modules/common/lib/common.constants';
import UserBookReviewManagementEditForm from './user-book-review-management-edit-form';
import { BookReviewPatchResponse } from '@modules/api/types/books-api.types';
import { EditBookReviewFormActionData } from '@modules/books/types/book-validations.types';
import { useBookStore } from '@modules/books/state/book.slice';

const UserBookReviewManagementEdit: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();

  const { mutateAsync } = useMutation<BookReviewPatchResponse, Error, EditBookReviewFormActionData>({
    mutationKey: ['book-review-edit', book?.id],
    mutationFn: async (data) => {
      try {
        if (!book) return;

        const url = new URL('/api/books/review', __URL__);
        const body = JSON.stringify({
          bookId: book.id,
          review: data.review,
        });

        const response = await fetch(url, { method: 'PATCH', body });
        if (!response.ok) {
          throw new Error('Could not update book review!');
        }

        return response.json();
      } catch (error) {
        let errorMessage = 'Could not update book review!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      } finally {
        setDialogOpen(false);
      }
    },
    onSuccess: async (data) => {
      if (!book) return;

      if (data && data.review) {
        await queryClient.refetchQueries(['book-page', book.id]);
        toast({ variant: 'success', content: `Book review updated successfully!` });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Update Review" size="sm" variant="outline">
          <EditIcon className="mr-2 stroke-current" />
          Update
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
