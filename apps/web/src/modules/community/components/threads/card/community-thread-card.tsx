import React from 'react';
import CommunityThreadCreatedAt from '../common/community-thread-created-at';
import CommunityThreadAuthor from '../common/community-thread-author';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import Link from 'next/link';
import CommunityThreadKeywords from '../common/community-thread-keywords';

interface CommunityThreadCardProps {
  thread: ThreadWithDetails;
}

const CommunityThreadCard: React.FC<CommunityThreadCardProps> = (props) => {
  const { thread } = props;

  return (
    <Link
      href={`/community/threads/${thread.id}`}
      className="p-4 border rounded-lg shadow hover:scale-[101%] transition-transform"
    >
      <div className="flex gap-2 items-center mb-1">
        <CommunityThreadAuthor author={thread.author} />
        <div>
          <h3 className="font-bold">{thread.title}</h3>
          <CommunityThreadCreatedAt createdAt={thread.createdAt} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-1.5">
        <CommunityThreadKeywords keywords={thread.keywords} />
        <span className="ml-auto">
          <strong>{thread.commentsCount}</strong> comments
        </span>
      </div>
      <p className="line-clamp-2 text-sm md:text-base mt-0.5">{thread.content}</p>
    </Link>
  );
};

export default CommunityThreadCard;
