import React, { useState } from 'react';
import type { Book } from '@read-quill/database';
import { useToast } from '@read-quill/design-system';
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { BOOK_MAX_RATING } from '@modules/books/lib/book.constants';
import BookRatingStar from './book-rating-star';
import { useChangeBookRating } from '@modules/books/hooks/rating/use-change-book-rating';

interface BookRatingProps {
  book: Book;
}

const BookRating: React.FC<BookRatingProps> = (props) => {
  const { book } = props;

  const { queryClient } = useQueriesStore();
  const { toast } = useToast();

  const [rating, setRating] = useState(book.rating ?? -1);

  const { changeRating, isLoading } = useChangeBookRating({
    book,
    onSuccess: async (data) => {
      if (data && data.success) {
        await queryClient.refetchQueries(['book', book.id]);
        toast({
          variant: 'success',
          content: 'Book rating updated successfully!',
        });
      }
    },
  });

  return (
    <div className="flex">
      {Array.from({ length: BOOK_MAX_RATING }).map((_rating, index) => (
        <BookRatingStar
          key={`rating-star-${index}`}
          bookRating={book.rating}
          isLoading={isLoading}
          onClick={async () => {
            await changeRating({ rating });
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
