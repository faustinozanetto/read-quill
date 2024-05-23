import React from 'react';
import { useToast, DeleteIcon } from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import { useBookStore } from '@modules/books/state/book.slice';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { __URL__ } from '@modules/common/lib/common.constants';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { BookReviewDeleteResponse } from '@modules/api/types/books-api.types';

const UserBookReviewManagementDelete: React.FC = () => {
  const { toast } = useToast();
  const { queryClient } = useQueriesStore();
  const { book } = useBookStore();

  const { mutateAsync } = useMutation<BookReviewDeleteResponse, Error>({
    mutationFn: async () => {
      if (!book) return;

      try {
        const url = new URL('/api/books/review', __URL__);
        const body = JSON.stringify({
          bookId: book.id,
        });

        const response = await fetch(url, { method: 'DELETE', body });
        if (!response.ok) {
          throw new Error('Could not delete book review!');
        }

        return response.json();
      } catch (error) {
        let errorMessage = 'Could not delete book review!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
    onSuccess: async (data) => {
      if (!book) return;

      if (data && data.success) {
        await queryClient.refetchQueries(['book-page', book.id]);
        toast({ variant: 'success', content: `Book review deleted successfully!` });
      }
    },
  });

  return (
    <ManagementDeleteObject label="Delete Review" onDeleted={mutateAsync} size="sm" variant="outline-destructive">
      <DeleteIcon className="mr-2 stroke-current" />
      Delete
    </ManagementDeleteObject>
  );
};

export default UserBookReviewManagementDelete;
