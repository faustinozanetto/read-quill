import React from 'react';
import {
  HeartMinusIcon,
  HeartPlusIcon,
  LoadingIcon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  buttonVariants,
} from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import { useIsThreadFavourite } from '@modules/community/hooks/use-is-thread-favourite';
import { useSession } from 'next-auth/react';
import { useSetThreadFavourite } from '@modules/community/hooks/use-set-thread-favourite';

interface CommnuityThreadFavouriteProps {
  thread: ThreadWithDetails;
}

const CommnuityThreadFavourite: React.FC<CommnuityThreadFavouriteProps> = (props) => {
  const { thread } = props;

  const { data: session } = useSession();
  const {
    data: { isFavourite: isCurrentThreadFavourite },
    isLoading,
    isFetching,
  } = useIsThreadFavourite({
    threadId: thread.id,
    userId: session?.user.id,
  });
  const { mutateAsync, isLoading: isSetLoading } = useSetThreadFavourite();

  const handleSetFavourite = async () => {
    if (!session?.user) return;

    await mutateAsync({
      userId: session.user.id,
      threadId: thread.id,
      currentThreadFavourite: isCurrentThreadFavourite,
    });
  };

  const isContentLoading = isLoading || isFetching || isSetLoading;
  const label = isCurrentThreadFavourite ? 'Remove Favourite' : 'Add Favourite';

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger
          className={buttonVariants({ size: 'icon', className: 'aspect-square' })}
          disabled={isContentLoading}
          onClick={handleSetFavourite}
        >
          {isContentLoading ? <LoadingIcon /> : isCurrentThreadFavourite ? <HeartMinusIcon /> : <HeartPlusIcon />}
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CommnuityThreadFavourite;
