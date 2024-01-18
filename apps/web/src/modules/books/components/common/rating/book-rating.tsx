import React, { useState } from 'react';
import type { Book } from '@read-quill/database';
import { useToast } from '@read-quill/design-system';
import { useMutation } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { BOOK_MAX_RATING } from '@modules/books/lib/book.constants';
import BookRatingStar from './book-rating-star';

interface BookRatingProps {
  book: Book;
}

const BookRating: React.FC<BookRatingProps> = (props) => {
  const { book } = props;

  const { queryClient } = useQueriesStore();
  const { toast } = useToast();

  const [rating, setRating] = useState(book.rating ?? -1);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      try {
        const url = new URL('/api/books/rating', __URL__);
        const body = JSON.stringify({
          bookId: book.id,
          rating,
        });

        const response = await fetch(url, { method: 'POST', body });
        if (!response.ok) {
          throw new Error('Could not updated book rating!');
        }

        toast({
          variant: 'success',
          content: 'Book rating updated successfully!',
        });
      } catch (error) {
        let errorMessage = 'Could not updated book rating!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['book-page', book.id]);
    },
  });

  return (
    <div className="flex">
      {Array.from({ length: BOOK_MAX_RATING }).map((_rating, index) => (
        <BookRatingStar
          bookRating={book.rating}
          isLoading={isLoading}
          key={`rating-star-${index}`}
          onClick={async () => {
            await mutateAsync();
          }}
          setRating={setRating}
          stateRating={rating}
          value={index}
        />
      ))}
    </div>
  );
};

export default BookRating;
