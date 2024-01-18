import React from 'react';
import { useToast, DeleteIcon } from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import type { Annotation } from '@read-quill/database';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { useBookStore } from '@modules/books/state/book.slice';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useQueriesStore } from '@modules/queries/state/queries.slice';

interface BookAnnotationManagementDeleteProps {
  annotation: Annotation;
}

const BookAnnotationManagementDelete: React.FC<BookAnnotationManagementDeleteProps> = (props) => {
  const { annotation } = props;

  const { toast } = useToast();
  const { book } = useBookStore();
  const { queryClient } = useQueriesStore();

  const { mutateAsync } = useMutation({
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

        toast({ variant: 'success', content: 'Annotation deleted successfully!' });
      } catch (error) {
        let errorMessage = 'Could not delete annotation!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
    onSuccess: async () => {
      if (!book) return;

      await queryClient.invalidateQueries(['book-annotations', book.id]);
    },
  });

  return (
    <ManagementDeleteObject label="Delete Annotation" onDeleted={mutateAsync} size="icon">
      <DeleteIcon className="stroke-current" />
    </ManagementDeleteObject>
  );
};

export default BookAnnotationManagementDelete;
