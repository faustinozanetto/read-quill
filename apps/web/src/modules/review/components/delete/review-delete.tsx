import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  buttonVariants,
  useToast,
} from '@read-quill/design-system';

import { UseDeleteReviewParams, useDeleteReview } from '@modules/review/hooks/use-delete-review';

interface ReviewCreateProps {
  reviewId?: string;
  onSuccess: UseDeleteReviewParams['onSuccess'];
  deleteButton: React.ReactNode;
}

const ReviewDelete: React.FC<ReviewCreateProps> = (props) => {
  const { deleteButton, onSuccess, reviewId } = props;

  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { deleteReview } = useDeleteReview({
    onSuccess: async (data, variables, context) => {
      if (data.success) {
        await onSuccess(data, variables, context);
        setDialogOpen(false);
        toast({ variant: 'success', content: `Book review deleted successfully!` });
      }
    },
  });

  return (
    <AlertDialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <AlertDialogTrigger asChild>{deleteButton}</AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Review</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete it?. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={async () => {
              if (!reviewId) return;
              await deleteReview({ reviewId });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReviewDelete;
