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
import { useMutation } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useQueriesStore } from '@modules/queries/state/queries.slice';

interface BookFavouriteProps {
  book: Book;
}

const BookFavourite: React.FC<BookFavouriteProps> = (props) => {
  const { book } = props;

  const { queryClient } = useQueriesStore();
  const { toast } = useToast();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      try {
        const url = new URL('/api/books/favourite', __URL__);
        const body = JSON.stringify({
          bookId: book.id,
          isFavourite: !book.isFavourite,
        });

        const response = await fetch(url, { method: 'POST', body });
        if (!response.ok) {
          throw new Error('Could not update book favourite!');
        }

        toast({
          variant: 'success',
          content: `Book ${book.isFavourite ? 'removed' : 'added'} ${book.isFavourite ? 'from' : 'to'} favourites!`,
        });
      } catch (error) {
        let errorMessage = 'Could not update book favourite!';
        if (error instanceof Error) errorMessage = error.message;

        toast({ variant: 'error', content: errorMessage });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['book-page', book.id]);
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
          onClick={async () => mutateAsync()}
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
