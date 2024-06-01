import React from 'react';
import { DeleteIcon, useToast } from '@read-quill/design-system';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';

import { UseDeleteReviewParams, useDeleteReview } from '@modules/review/hooks/use-delete-review';

interface ReviewCreateProps {
  reviewId?: string;
  onSuccess: UseDeleteReviewParams['onSuccess'];
  deleteButton: React.ReactNode;
}

const ReviewDelete: React.FC<ReviewCreateProps> = (props) => {
  const { deleteButton, onSuccess, reviewId } = props;

  const { toast } = useToast();

  const { deleteReview } = useDeleteReview({
    reviewId,
    onSuccess: async (data, variables, context) => {
      if (data.success) {
        onSuccess(data, variables, context);
        toast({ variant: 'success', content: `Book review deleted successfully!` });
      }
    },
  });

  return (
    <ManagementDeleteObject label="Delete Review" onDeleted={deleteReview} size="sm" variant="outline-destructive">
      <DeleteIcon className="mr-2 stroke-current" />
      Delete
    </ManagementDeleteObject>
  );
};

export default ReviewDelete;
