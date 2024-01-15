import React from 'react';

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

import { useRouter } from 'next/navigation';
import UserBookReviewManagementEditForm, {
  UserBookReviewManagementEditFormData,
} from './user-book-review-management-edit-form';
import { useBookStore } from '@modules/books/state/book.slice';

const UserBookReviewManagementEdit: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { book } = useBookStore();

  const handleUpdateReview = async (data: UserBookReviewManagementEditFormData) => {
    if (!book) return;

    try {
      const url = new URL('/api/books/review', process.env.NEXT_PUBLIC_URL);
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
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="Update Review">
          <PlusIcon className="mr-2 stroke-current" />
          Update Review
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Review</DialogTitle>
          <DialogDescription>Update your personal review of the book.</DialogDescription>
        </DialogHeader>

        <UserBookReviewManagementEditForm onSubmit={handleUpdateReview} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookReviewManagementEdit;
