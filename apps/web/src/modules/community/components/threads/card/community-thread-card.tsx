import React from 'react';
import CommunityThreadCreatedAt from '../common/community-thread-created-at';
import CommunityThreadAuthor from '../common/community-thread-author';
import { ThreadWithAuthor } from '@modules/community/types/community.types';
import Link from 'next/link';

interface CommunityThreadCardProps {
  thread: ThreadWithAuthor;
}

const CommunityThreadCard: React.FC<CommunityThreadCardProps> = (props) => {
  const { thread } = props;

  return (
    <Link
      href={`/community/threads/${thread.id}`}
      className="p-4 border rounded-lg shadow hover:scale-[101%] transition-transform"
    >
      <div className="flex gap-2 items-center">
        <CommunityThreadAuthor author={thread.author} />
        <div>
          <h3 className="font-bold">{thread.title}</h3>
          <CommunityThreadCreatedAt createdAt={thread.createdAt} />
        </div>
      </div>
      <p className="line-clamp-2 text-sm md:text-base">{thread.content}</p>
    </Link>
  );
};

export default CommunityThreadCard;
