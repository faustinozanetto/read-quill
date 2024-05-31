'use client';

import React from 'react';
import UserBookAnnotationsHeader from './user-book-annotations-header';
import { useBookAnnotations } from '@modules/books/hooks/use-book-annotations';
import BookAnnotationCardPlaceholder from '@modules/annotations/components/cards/book-annotation-card-placeholder';
import BookAnnotationsFeed from '@modules/annotations/components/feed/books-annotations-feed';
import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';

const UserBookAnnotations: React.FC = () => {
  const { data, isFetching, isLoading } = useBookAnnotations();
  const { isBookOwner } = useIsBookOwner();

  return (
    <div className="flex flex-col rounded-lg p-4 shadow border gap-2">
      <UserBookAnnotationsHeader />

      {(isFetching || isLoading) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <BookAnnotationCardPlaceholder key={`book-annotation-placeholder-${i}`} />
          ))}
        </div>
      )}

      {!(isFetching || isLoading) && data && data.annotations.length > 0 && (
        <BookAnnotationsFeed annotations={data.annotations} />
      )}

      {!(isFetching || isLoading) && data && data.annotations.length === 0 ? (
        <p>
          {isBookOwner ? (
            <>
              No annotations found, add one by clicking the{' '}
              <span className="text-primary font-bold underline">Add</span> button to get started.
            </>
          ) : (
            <>It looks like this user has not written annotations yet!</>
          )}
        </p>
      ) : null}
    </div>
  );
};

export default UserBookAnnotations;
