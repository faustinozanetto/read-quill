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
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { __URL__ } from '@modules/common/lib/common.constants';
import UserBookReviewManagementAddForm from './user-book-review-management-add-form';
import { BookReviewPostResponse } from '@modules/api/types/books-api.types';
import { CreateBookReviewFormActionData } from '@modules/books/types/book-validations.types';
import { useBookStore } from '@modules/books/state/book.slice';

const UserBookReviewManagementAdd: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();

  const { mutateAsync } = useMutation<BookReviewPostResponse, Error, CreateBookReviewFormActionData>({
    mutationKey: ['book-review-add', book?.id],
    mutationFn: async (data) => {
      try {
        if (!book) return;

        const url = new URL('/api/books/review', __URL__);
        const body = JSON.stringify({
          bookId: book.id,
          review: data.review,
        });

        const response = await fetch(url, { method: 'POST', body });
        if (!response.ok) {
          throw new Error('Could not add book review!');
        }
        return response.json();
      } catch (error) {
        let errorMessage = 'Could not add book review!';
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
        toast({ variant: 'success', content: `Book review added successfully!` });
      }
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
