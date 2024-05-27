import React from 'react';
import { DeleteIcon } from '@read-quill/design-system';
import type { Annotation } from '@read-quill/database';
import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { useBookStore } from '@modules/books/state/book.slice';
import { useBookAnnotationDelete } from '@modules/annotations/hooks/use-book-annotation-delete';

interface BookAnnotationManagementDeleteProps {
  annotation: Annotation;
}

const BookAnnotationManagementDelete: React.FC<BookAnnotationManagementDeleteProps> = (props) => {
  const { annotation } = props;

  const { book } = useBookStore();
  const { queryClient } = useQueriesStore();

  const { deleteAnnotation } = useBookAnnotationDelete({
    annotation,
    onSuccess: async (data) => {
      if (data.success && book) await queryClient.refetchQueries(['book-annotations', book.id]);
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
