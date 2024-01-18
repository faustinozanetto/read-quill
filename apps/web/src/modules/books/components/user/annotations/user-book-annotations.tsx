'use client';

import React from 'react';
import { useBookStore } from '@modules/books/state/book.slice';
import { useQuery } from '@tanstack/react-query';
import type { Annotation } from '@read-quill/database';
import { __URL__ } from '@modules/common/lib/common.constants';
import UserBookAnnotationsHeader from './user-book-annotations-header';
import BookAnnotationCardPlaceholder from '../../../../annotations/components/cards/book-annotation-card-placeholder';
import BookAnnotationsFeed from '@modules/annotations/components/feed/books-annotations-feed';

const UserBookAnnotations: React.FC = () => {
  const { book } = useBookStore();

  const { isLoading, data } = useQuery<Annotation[]>(['book-annotations', book?.id], {
    queryFn: async () => {
      if (!book) return [];
      const url = new URL('/api/books/annotations', __URL__);
      url.searchParams.set('bookId', book.id);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch book annotations!');
      }

      const { annotations }: { annotations: Annotation[] } = await response.json();
      return annotations;
    },
  });

  return (
    <div className="flex flex-col rounded-lg p-4 shadow border gap-2">
      <UserBookAnnotationsHeader />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <BookAnnotationCardPlaceholder key={`book-annotation-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!isLoading && data && data.length > 0 ? <BookAnnotationsFeed annotations={data} /> : null}

      {!isLoading && data && data.length === 0 ? <p>This user has not made any book annotations so far!</p> : null}
    </div>
  );
};

export default UserBookAnnotations;
