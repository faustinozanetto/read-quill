import React from 'react';
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

  const { toast } = useToast();

  const { createReview } = useCreateReview({
    onSuccess: async (data, variables, context) => {
      if (data.data?.review) {
        await onSuccess(data, variables, context);
        toast({ variant: 'success', content: `Book review added successfully!` });
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{createButton}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>Add your personal review of the book.</DialogDescription>
        </DialogHeader>

        <ReviewCreateForm
          onSubmit={async (data) => {
            if (bookId) await createReview({ ...data, bookId });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ReviewCreate;
