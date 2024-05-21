import React from 'react';
import { ThreadWithDetails } from '@modules/community/types/community.types.ts';
import CommunityThreadComments from './comments/community-thread-comments';
import CommunityThreadDetails from './details/community-thread-details';
import CommunityThreadContent from './community-thread-content';

interface CommunityThreadProps {
  thread: ThreadWithDetails;
}

const CommunityThread: React.FC<CommunityThreadProps> = (props) => {
  const { thread } = props;

  return (
    <section className="mx-auto flex flex-col gap-4">
      <CommunityThreadDetails thread={thread} />
      <CommunityThreadContent content={thread.content} />
      <CommunityThreadComments thread={thread} />
    </section>
  );
};

export default CommunityThread;
