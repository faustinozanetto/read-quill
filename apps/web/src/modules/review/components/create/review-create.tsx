import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  useToast,
} from '@read-quill/design-system';

import { UseCreateReviewParams, useCreateReview } from '@modules/review/hooks/use-create-review';
import ReviewCreateForm from './review-create-form';

interface ReviewCreateProps {
  bookId?: string;
  onSuccess: UseCreateReviewParams['onSuccess'];
  createButton: React.ReactNode;
}

const ReviewCreate: React.FC<ReviewCreateProps> = (props) => {
  const { bookId, createButton, onSuccess } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const { toast } = useToast();

  const { createReview } = useCreateReview({
    bookId,
    onSuccess: async (data, variables, context) => {
      if (data.review) {
        await onSuccess(data, variables, context);
        setDialogOpen(false);
        toast({ variant: 'success', content: `Book review added successfully!` });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>{createButton}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>Add your personal review of the book.</DialogDescription>
        </DialogHeader>

        <ReviewCreateForm onSubmit={createReview} />
      </DialogContent>
    </Dialog>
  );
};

export default ReviewCreate;
