import React from 'react';
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
import { useRouter } from 'next/navigation';
import { useBookStore } from '@modules/books/state/book.slice';
import type { UserBookReviewManagementAddFormData } from './user-book-review-management-add-form';
import UserBookReviewManagementAddForm from './user-book-review-management-add-form';

const UserBookReviewManagementAdd: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { book } = useBookStore();

  const handleAddReview = async (data: UserBookReviewManagementAddFormData) => {
    if (!book) return;

    try {
      const url = new URL('/api/books/review', process.env.NEXT_PUBLIC_URL);
      const body = JSON.stringify({
        bookId: book.id,
        review: data.review,
      });

      const response = await fetch(url, { method: 'POST', body });
      if (!response.ok) {
        throw new Error('Could not add book review!');
      }

      toast({ variant: 'success', content: `Book review added successfully!` });
      router.refresh();
    } catch (error) {
      let errorMessage = 'Could not add book review!';
      if (error instanceof Error) errorMessage = error.message;

      toast({ variant: 'error', content: errorMessage });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="Add Review">
          <EditIcon className="mr-2 stroke-current" />
          Add Review
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>Add your personal review of the book.</DialogDescription>
        </DialogHeader>

        <UserBookReviewManagementAddForm onSubmit={handleAddReview} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookReviewManagementAdd;
