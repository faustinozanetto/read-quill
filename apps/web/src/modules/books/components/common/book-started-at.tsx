import type { ComponentPropsWithoutRef } from 'react';
import React from 'react';
import type { Book } from '@read-quill/database';
import { FlagIcon, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, cn } from '@read-quill/design-system';

interface BookStartedAtProps extends ComponentPropsWithoutRef<typeof TooltipTrigger> {
  startedAt: NonNullable<Book['startedAt']>;
}

const BookStartedAt: React.FC<BookStartedAtProps> = (props) => {
  const { startedAt, className, ...rest } = props;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn('text-sm flex gap-1 items-center justify-center font-semibold', className)}
          {...rest}
        >
          <FlagIcon />
          {new Date(startedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
        </TooltipTrigger>
        <TooltipContent>
          <p>Book Started At</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BookStartedAt;
