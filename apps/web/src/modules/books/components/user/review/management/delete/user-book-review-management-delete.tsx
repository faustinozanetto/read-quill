import React from 'react';
import { DeleteIcon, useToast } from '@read-quill/design-system';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { useBookStore } from '@modules/books/state/book.slice';
import { useDeleteBookReview } from '@modules/books/hooks/review/use-delete-book-review';

const UserBookReviewManagementDelete: React.FC = () => {
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();
  const { toast } = useToast();

  const { deleteReview } = useDeleteBookReview({
    book,
    onSuccess: async (data) => {
      if (data && data.success && book) {
        await queryClient.refetchQueries(['book-page', book.id]);
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

export default UserBookReviewManagementDelete;
