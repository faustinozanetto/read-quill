import React from 'react';
import { DeleteIcon, useToast } from '@read-quill/design-system';
import type { Annotation } from '@read-quill/database';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { useBookStore } from '@modules/books/state/book.slice';
import { useDeleteBookAnnotation } from '@modules/annotations/hooks/use-delete-book-annotation';

interface BookAnnotationManagementDeleteProps {
  annotation: Annotation;
}

const BookAnnotationManagementDelete: React.FC<BookAnnotationManagementDeleteProps> = (props) => {
  const { annotation } = props;

  const { book } = useBookStore();
  const { queryClient } = useQueriesStore();
  const { toast } = useToast();

  const { deleteAnnotation } = useDeleteBookAnnotation({
    annotation,
    onSuccess: async (data) => {
      if (data.success && book) {
        await queryClient.refetchQueries(['book-annotations', book.id]);
        toast({ variant: 'success', content: `Book annotation deleted successfully!` });
      }
    },
  });

  return (
    <ManagementDeleteObject
      label="Delete Annotation"
      onDeleted={deleteAnnotation}
      size="icon"
      variant="outline-destructive"
    >
      <DeleteIcon className="stroke-current" />
    </ManagementDeleteObject>
  );
};

export default BookAnnotationManagementDelete;
