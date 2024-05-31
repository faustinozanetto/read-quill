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
import UserBookReviewManagementEditForm from './user-book-review-management-edit-form';

import { useBookStore } from '@modules/books/state/book.slice';
import { useEditBookReview } from '@modules/books/hooks/review/use-edit-book-review';

const UserBookReviewManagementEdit: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();
  const { toast } = useToast();

  const { editReview } = useEditBookReview({
    book,
    onSuccess: async (data) => {
      if (data && data.review && book) {
        await queryClient.refetchQueries(['book-page', book.id]);
        setDialogOpen(false);
        toast({ variant: 'success', content: `Book review edited successfully!` });
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

        <UserBookReviewManagementEditForm onSubmit={editReview} />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookReviewManagementEdit;
