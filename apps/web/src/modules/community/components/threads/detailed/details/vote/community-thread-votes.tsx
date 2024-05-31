import React from 'react';

import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import { ArrowDownIcon, ArrowUpIcon } from '@read-quill/design-system';
import { useThreadVoteCount } from '@modules/community/hooks/threads/vote/use-thread-vote-count';
import CommnuityThreadVoteOption from './community-thread-vote-option';
import { Skeleton } from '@read-quill/design-system';

interface CommnuityThreadVotesProps {
  thread: ThreadWithDetails;
}

const CommnuityThreadVotes: React.FC<CommnuityThreadVotesProps> = (props) => {
  const { thread } = props;

  const { data, isLoading, isFetching } = useThreadVoteCount({
    threadId: thread.id,
  });

  return (
    <div className="flex flex-col gap-0.5 items-center justify-center">
      <CommnuityThreadVoteOption thread={thread} type="upvote" icon={<ArrowUpIcon />} />
      {isFetching || isLoading ? (
        <Skeleton className="h-4 w-4" />
      ) : (
        <span className="text-sm font-medium">{data.votes}</span>
      )}
      <CommnuityThreadVoteOption thread={thread} type="downvote" icon={<ArrowDownIcon />} />
    </div>
  );
};

export default CommnuityThreadVotes;
