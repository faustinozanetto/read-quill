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

import { UseEditReviewParams, useEditReview } from '@modules/review/hooks/use-edit-review';
import ReviewEditForm from './review-edit-form';
import { Review } from '@read-quill/database';

interface ReviewEditProps {
  review?: Review;
  onSuccess: UseEditReviewParams['onSuccess'];
  editButton: React.ReactNode;
}

const ReviewEdit: React.FC<ReviewEditProps> = (props) => {
  const { editButton, onSuccess, review } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const { toast } = useToast();

  const { editReview } = useEditReview({
    reviewId: review?.id,
    onSuccess: async (data, variables, context) => {
      if (data.review) {
        await onSuccess(data, variables, context);
        setDialogOpen(false);
        toast({ variant: 'success', content: `Book review edited successfully!` });
      }
    },
  });

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>{editButton}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Review</DialogTitle>
          <DialogDescription>Update your personal review of the book.</DialogDescription>
        </DialogHeader>

        <ReviewEditForm onSubmit={editReview} initialData={review} />
      </DialogContent>
    </Dialog>
  );
};

export default ReviewEdit;
