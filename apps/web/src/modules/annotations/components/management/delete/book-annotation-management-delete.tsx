import React from 'react';
import { useToast, DeleteIcon } from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import type { Annotation } from '@read-quill/database';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { useBookStore } from '@modules/books/state/book.slice';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { BookAnnotationDeleteResponse } from '@modules/api/types/books-api.types';

interface BookAnnotationManagementDeleteProps {
  annotation: Annotation;
}

const BookAnnotationManagementDelete: React.FC<BookAnnotationManagementDeleteProps> = (props) => {
  const { annotation } = props;

  const { toast } = useToast();
  const { book } = useBookStore();
  const { queryClient } = useQueriesStore();

  const { mutateAsync } = useMutation<BookAnnotationDeleteResponse, Error>({
    mutationFn: async () => {
      try {
        const url = new URL('/api/books/annotations', __URL__);
        const body = JSON.stringify({
          annotationId: annotation.id,
        });

        const response = await fetch(url, { method: 'DELETE', body });
        if (!response.ok) {
          throw new Error('Could not delete annotation!');
        }

        return response.json();
      } catch (error) {
        let errorMessage = 'Could not delete annotation!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
    onSuccess: async (data) => {
      if (!book) return;

      if (data && data.success) {
        await queryClient.refetchQueries(['book-annotations', book.id]);

        toast({ variant: 'success', content: `Book annotation deleted successfully!` });
      }
    },
  });

  return (
    <ManagementDeleteObject label="Delete Annotation" onDeleted={mutateAsync} size="icon" variant="outline-destructive">
      <DeleteIcon className="stroke-current" />
    </ManagementDeleteObject>
  );
};

export default BookAnnotationManagementDelete;
