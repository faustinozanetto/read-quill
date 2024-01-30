'use client';

import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';
import BookAnnotationsFeed from '@modules/annotations/components/feed/books-annotations-feed';
import { useBookAnnotations } from '@modules/books/hooks/use-book-annotations';
import BookAnnotationCardPlaceholder from '../../../../annotations/components/cards/book-annotation-card-placeholder';
import UserBookAnnotationsHeader from './user-book-annotations-header';

const UserBookAnnotations: React.FC = () => {
  const { data, isFetching, isLoading } = useBookAnnotations();

  return (
    <div className="flex flex-col rounded-lg p-4 shadow border gap-2">
      <UserBookAnnotationsHeader />

      {isFetching || isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <BookAnnotationCardPlaceholder key={`book-annotation-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!(isFetching || isLoading) && data.annotations.length > 0 ? (
        <BookAnnotationsFeed annotations={data.annotations} />
      ) : null}

      {!(isFetching || isLoading) && data.annotations.length === 0 ? (
        <p>This user has not made any book annotations so far!</p>
      ) : null}
    </div>
  );
};

export default UserBookAnnotations;
