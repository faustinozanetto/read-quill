import React from 'react';
import type { Annotation } from '@read-quill/database';
import BookAnnotationCard from '../cards/book-annotation-card';

interface BookAnnotationsFeedProps {
  annotations: Annotation[];
}

const BookAnnotationsFeed: React.FC<BookAnnotationsFeedProps> = (props) => {
  const { annotations } = props;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {annotations.map((annotation) => {
        return <BookAnnotationCard annotation={annotation} key={`annotation-${annotation.id}`} />;
      })}
    </div>
  );
};

export default BookAnnotationsFeed;
