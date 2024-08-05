import React, { useState } from 'react';
import type { Book } from '@read-quill/database';
import { useToast } from '@read-quill/design-system';
import { BOOK_MAX_RATING } from '@modules/books/lib/book.constants';
import BookRatingStar from './book-rating-star';
import { useChangeBookRating } from '@modules/books/hooks/rating/use-change-book-rating';
import { useQueryClient } from '@tanstack/react-query';
import { analytics } from '@modules/analytics/lib/analytics.lib';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

interface BookRatingProps {
  book: Book;
}

const BookRating: React.FC<BookRatingProps> = (props) => {
  const { book } = props;

  const { toast } = useToast();
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(book.rating ?? -1);

  const { changeRating, isPending } = useChangeBookRating({
    onSuccess: async (data) => {
      if (data.data?.rating && user) {
        await queryClient.refetchQueries({ queryKey: ['book', book.id] });
        analytics.books.trackRating(
          { user: { id: user.id!, name: user.name! } },
          { bookId: book.id, rating: data.data.rating }
        );
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
