import type { ComponentPropsWithoutRef } from 'react';
import React from 'react';
import type { Book } from '@read-quill/database';
import {
  FlagCheckeredIcon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from '@read-quill/design-system';

interface BookFinishedAtProps extends ComponentPropsWithoutRef<typeof TooltipTrigger> {
  finishedAt: NonNullable<Book['finishedAt']>;
}

const BookFinishedAt: React.FC<BookFinishedAtProps> = (props) => {
  const { finishedAt, className, ...rest } = props;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn('text-sm flex gap-1 items-center justify-center font-semibold', className)}
          {...rest}
        >
          <FlagCheckeredIcon />
          {new Date(finishedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
        </TooltipTrigger>
        <TooltipContent>
          <p>Book Finished At</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BookFinishedAt;
