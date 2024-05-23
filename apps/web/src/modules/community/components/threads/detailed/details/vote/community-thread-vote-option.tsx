import React from 'react';

import { __URL__ } from '@modules/common/lib/common.constants';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import { Button } from '@read-quill/design-system';
import { useThreadVote } from '@modules/community/hooks/threads/use-thread-vote';
import { capitalize } from '@modules/common/lib/common.lib';
import { VoteThreadType } from '@modules/community/types/community-thread-validations.types';

interface CommnuityThreadVoteOptionProps {
  thread: ThreadWithDetails;
  type: VoteThreadType;
  icon: React.ReactNode;
}

const CommnuityThreadVoteOption: React.FC<CommnuityThreadVoteOptionProps> = (props) => {
  const { thread, type, icon } = props;

  const { mutateAsync, isLoading } = useThreadVote();

  const handleVote = async () => {
    await mutateAsync({ threadId: thread.id, type });
  };

  return (
    <Button
      aria-label={`${capitalize(type)} Thread`}
      size="icon"
      variant="ghost"
      className="h-7 w-7"
      disabled={isLoading}
      onClick={handleVote}
    >
      {icon}
    </Button>
  );
};

export default CommnuityThreadVoteOption;
