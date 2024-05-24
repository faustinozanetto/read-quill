import type { ComponentPropsWithoutRef } from 'react';
import React from 'react';
import type { Thread } from '@read-quill/database';
import { CalendarIcon, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, cn } from '@read-quill/design-system';

interface CommunityThreadCreatedAtProps extends ComponentPropsWithoutRef<typeof TooltipTrigger> {
  createdAt: Thread['createdAt'];
}

const CommunityThreadCreatedAt: React.FC<CommunityThreadCreatedAtProps> = (props) => {
  const { createdAt, className, ...rest } = props;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={cn('text-sm flex gap-1 items-center justify-center', className)} {...rest}>
          <CalendarIcon size="sm" />
          {new Date(createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
        </TooltipTrigger>
        <TooltipContent>
          <p>Thread Created At</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CommunityThreadCreatedAt;
