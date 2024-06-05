import React, { useState } from 'react';
import type { Book } from '@read-quill/database';
import { useToast } from '@read-quill/design-system';
import { BOOK_MAX_RATING } from '@modules/books/lib/book.constants';
import BookRatingStar from './book-rating-star';
import { useChangeBookRating } from '@modules/books/hooks/rating/use-change-book-rating';
import { useQueryClient } from '@tanstack/react-query';

interface BookRatingProps {
  book: Book;
}

const BookRating: React.FC<BookRatingProps> = (props) => {
  const { book } = props;

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [rating, setRating] = useState(book.rating ?? -1);

  const { changeRating, isPending } = useChangeBookRating({
    onSuccess: async (data) => {
      if (data.data?.rating) {
        await queryClient.refetchQueries({ queryKey: ['book', book.id] });
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
          isLoading={isPending}
          onClick={async () => {
            await changeRating({ bookId: book.id, rating });
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
