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
import { useQueriesStore } from '@modules/queries/state/queries.slice';
import { useChangeBookFavourite } from '@modules/books/hooks/favourite/use-change-book-favourite';

interface BookFavouriteProps {
  book: Book;
}

const BookFavourite: React.FC<BookFavouriteProps> = (props) => {
  const { book } = props;

  const { queryClient } = useQueriesStore();
  const { toast } = useToast();

  const { changeFavourite, isLoading } = useChangeBookFavourite({
    book,
    onSuccess: async (data) => {
      if (data && data.success) {
        await queryClient.refetchQueries(['book', book.id]);

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
          disabled={isLoading}
          onClick={async () => await changeFavourite()}
        >
          {isLoading ? <LoadingIcon /> : book.isFavourite ? <HeartMinusIcon /> : <HeartPlusIcon />}
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BookFavourite;
