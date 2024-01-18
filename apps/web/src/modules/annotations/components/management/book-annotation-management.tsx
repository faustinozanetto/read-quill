import React from 'react';
import type { Annotation } from '@read-quill/database';
import BookAnnotationManagementEdit from './edit/book-annotation-management-edit';
import BookAnnotationManagementDelete from './delete/book-annotation-management-delete';

interface BookAnnotationManagementProps {
  annotation: Annotation;
}

const BookAnnotationManagement: React.FC<BookAnnotationManagementProps> = (props) => {
  const { annotation } = props;

  return (
    <div className="flex gap-2">
      <BookAnnotationManagementEdit annotation={annotation} />
      <BookAnnotationManagementDelete annotation={annotation} />
    </div>
  );
};

export default BookAnnotationManagement;
