import React from 'react';
import CommunityThreadCreatedAt from '../common/community-thread-created-at';
import CommunityThreadAuthorAvatar from '../common/community-thread-author-avatar';
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
        <CommunityThreadAuthorAvatar author={thread.author} />
        <div className="flex-1">
          <h3 className="font-bold">{thread.title}</h3>
          <CommunityThreadCreatedAt createdAt={thread.createdAt} />
        </div>
        <div className="p-1 rounded-lg border bg-primary aspect-square h-10 w-10 flex items-center justify-center font-bold text-background">
          {thread.votes}
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
