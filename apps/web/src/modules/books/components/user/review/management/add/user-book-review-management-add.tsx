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
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import UserBookReviewManagementAddForm from './user-book-review-management-add-form';

import { useBookStore } from '@modules/books/state/book.slice';
import { useCreateBookReview } from '@modules/books/hooks/review/use-create-book-review';

const UserBookReviewManagementAdd: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();
  const { toast } = useToast();

  const { addReview } = useCreateBookReview({
    book,
    onSuccess: async (data) => {
      if (data.review && book) {
        await queryClient.refetchQueries(['book-page', book.id]);
        setDialogOpen(false);
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

        <UserBookReviewManagementAddForm onSubmit={addReview} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookReviewManagementAdd;
