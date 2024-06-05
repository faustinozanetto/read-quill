'use client';

import React from 'react';
import UserBookAnnotationsHeader from './user-book-annotations-header';
import { useBookAnnotations } from '@modules/books/hooks/use-book-annotations';

import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';
import AnnotationCardPlaceholder from '@modules/annotations/components/cards/annotation-card-placeholder';
import AnnotationsFeed from '@modules/annotations/components/feed/annotations-feed';
import { useBookStore } from '@modules/books/state/book.slice';
import { Separator } from '@read-quill/design-system';

const UserBookAnnotations: React.FC = () => {
  const { book } = useBookStore();
  const { isBookOwner } = useIsBookOwner();
  const { data, isLoading } = useBookAnnotations({
    pageSize: 6,
    bookId: book?.id,
  });

  return (
    <div className="flex flex-col rounded-lg p-4 shadow border gap-2">
      <UserBookAnnotationsHeader />
      <p>
        {isBookOwner ? (
          <>
            Document your thoughts, mark important passages, and make notes that enhance your understanding of your
            book. Your annotations serve as a valuable reference for revisiting key ideas and sharing deeper insights
            with your readers. Capture the essence of your work, one note at a time.
          </>
        ) : (
          <>
            Dive into detailed annotations and notes on their book. Gain a deeper understanding of the content through
            the author's personal highlights and reflections. These annotations offer a unique glimpse into [Owner's
            Name]'s thought process.
          </>
        )}
      </p>
      <Separator />

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <AnnotationCardPlaceholder key={`book-annotation-placeholder-${i}`} />
          ))}
        </div>
      )}

      {!isLoading && data?.data?.annotations.length ? <AnnotationsFeed annotations={data.data.annotations} /> : null}

      {!isLoading && !data?.data?.annotations.length ? (
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
