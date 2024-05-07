import React from 'react';
import CommunityThreadCard from '../card/community-thread-card';
import { ThreadWithDetails } from '@modules/community/types/community.types';

interface CommunityThreadsFeedProps {
  threads: ThreadWithDetails[];
}

const CommunityThreadsFeed: React.FC<CommunityThreadsFeedProps> = (props) => {
  const { threads } = props;

  return (
    <div className="flex flex-col gap-2">
      {threads.map((thread) => {
        return <CommunityThreadCard thread={thread} key={`thread-${thread.id}`} />;
      })}
    </div>
  );
};

export default CommunityThreadsFeed;
