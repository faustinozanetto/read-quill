import React from 'react';
import BookAnnotationManagementEdit from './edit/book-annotation-management-edit';
import { Annotation } from '@read-quill/database';
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
