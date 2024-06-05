import React from 'react';
import type { Book } from '@read-quill/database';
import {
  HeartMinusIcon,
  HeartPlusIcon,
  LoadingIcon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  buttonVariants,
  useToast,
} from '@read-quill/design-system';
import { useChangeBookFavourite } from '@modules/books/hooks/favourite/use-change-book-favourite';
import { useQueryClient } from '@tanstack/react-query';

interface BookFavouriteProps {
  book: Book;
}

const BookFavourite: React.FC<BookFavouriteProps> = (props) => {
  const { book } = props;

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { changeFavourite, isPending } = useChangeBookFavourite({
    onSuccess: async (data) => {
      if (data.data) {
        await queryClient.refetchQueries({ queryKey: ['book', book.id] });

        toast({
          variant: 'success',
          content: `Book ${book.isFavourite ? 'removed' : 'added'} ${book.isFavourite ? 'from' : 'to'} favourites!`,
        });
      }
    },
  });

  const label = book.isFavourite ? 'Remove Favourite' : 'Add Favourite';

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger
          aria-label={label}
          className={buttonVariants({ size: 'icon', className: 'aspect-square' })}
          disabled={isPending}
          onClick={async () => await changeFavourite({ isFavourite: book.isFavourite, bookId: book.id })}
        >
          {isPending ? <LoadingIcon /> : book.isFavourite ? <HeartMinusIcon /> : <HeartPlusIcon />}
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BookFavourite;
