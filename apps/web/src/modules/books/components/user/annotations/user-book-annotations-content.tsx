'use client';

import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import BookAnnotationsFeed from '@modules/annotations/components/feed/books-annotations-feed';
import { useBookAnnotations } from '@modules/books/hooks/use-book-annotations';
import BookAnnotationCardPlaceholder from '@modules/annotations/components/cards/book-annotation-card-placeholder';

const UserBookAnnotationsContent: React.FC = () => {
  const { data, isFetching, isLoading } = useBookAnnotations();

  if (isFetching || isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <BookAnnotationCardPlaceholder key={`book-annotation-placeholder-${i}`} />
        ))}
      </div>
    );
  }

  if (data.annotations.length === 0)
    return (
      <p>
        No annotations found, add one by clicking the <span className="text-primary font-bold underline">Add</span>{' '}
        button to get started.
      </p>
    );

  return <BookAnnotationsFeed annotations={data.annotations} />;
};

export default UserBookAnnotationsContent;
