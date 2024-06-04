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
import { useIsThreadFavourite } from '@modules/community/hooks/threads/use-is-thread-favourite';

import { useSetThreadFavourite } from '@modules/community/hooks/threads/use-set-thread-favourite';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

interface CommnuityThreadFavouriteProps {
  thread: ThreadWithDetails;
}

const CommnuityThreadFavourite: React.FC<CommnuityThreadFavouriteProps> = (props) => {
  const { thread } = props;

  const { user } = useAuthContext();
  const { data, isLoading } = useIsThreadFavourite({
    threadId: thread.id,
    userId: user?.id,
  });
  const { mutateAsync, isLoading: isSetLoading } = useSetThreadFavourite();

  const handleSetFavourite = async () => {
    if (!user || !user.id || !data) return;

    await mutateAsync({
      userId: user.id,
      threadId: thread.id,
      currentThreadFavourite: isCurrentThreadFavourite,
    });
  };

  const isCurrentThreadFavourite = data?.isFavourite ?? false;
  const isContentLoading = isLoading || isSetLoading;
  const label = data?.isFavourite ? 'Remove Favourite' : 'Add Favourite';

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
