import React from 'react';
import { ThreadWithDetails } from '@modules/community/types/community.types.ts';
import CommunityThreadComments from './comments/community-thread-comments';
import CommunityThreadDetails from './details/community-thread-details';

interface CommunityThreadProps {
  thread: ThreadWithDetails;
}

const CommunityThread: React.FC<CommunityThreadProps> = (props) => {
  const { thread } = props;

  return (
    <section className="mx-auto flex flex-col gap-4">
      <CommunityThreadDetails thread={thread} />
      <div className="p-4 border rounded-lg shadow">{thread.content}</div>
      <CommunityThreadComments thread={thread} />
    </section>
  );
};

export default CommunityThread;
