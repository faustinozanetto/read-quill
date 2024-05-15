import React from 'react';

import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import { ArrowDownIcon, ArrowUpIcon, Button } from '@read-quill/design-system';
import { useThreadVote } from '@modules/community/hooks/use-thread-vote';

interface CommnuityThreadVotesProps {
  thread: ThreadWithDetails;
}

const CommnuityThreadVotes: React.FC<CommnuityThreadVotesProps> = (props) => {
  const { thread } = props;

  const { mutateAsync, isLoading } = useThreadVote();

  const handleUpvote = async () => {
    await mutateAsync({ threadId: thread.id, type: 'upvote' });
  };

  const handleDownvote = async () => {
    await mutateAsync({ threadId: thread.id, type: 'downvote' });
  };

  return (
    <div className="flex flex-col gap-0.5 items-center justify-center">
      <Button
        aria-label="Upvote Thread"
        size="icon"
        variant="ghost"
        className="h-7 w-7"
        disabled={isLoading}
        onClick={handleUpvote}
      >
        <ArrowUpIcon />
      </Button>
      <span className="text-sm font-medium">{thread.votes}</span>
      <Button
        aria-label="Downvote Thread"
        size="icon"
        variant="ghost"
        className="h-7 w-7"
        disabled={isLoading}
        onClick={handleDownvote}
      >
        <ArrowDownIcon />
      </Button>
    </div>
  );
};

export default CommnuityThreadVotes;
