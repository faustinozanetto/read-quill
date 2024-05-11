import React from 'react';
import { ThreadWithDetails } from '@modules/community/types/community.types.ts';
import Link from 'next/link';
import { ArrowLeftIcon, Button } from '@read-quill/design-system';
import CommunityThreadKeywords from '../../common/community-thread-keywords';
import CommunityThreadAuthorAvatar from '../../common/community-thread-author-avatar';
import CommunityThreadCreatedAt from '../../common/community-thread-created-at';
import CommunityThreadManagement from '../management/community-thread-management';
import { useIsThreadOwner } from '@modules/community/hooks/use-is-thread-owner';

interface CommunityThreadDetailsProps {
  thread: ThreadWithDetails;
}

const CommunityThreadDetails: React.FC<CommunityThreadDetailsProps> = (props) => {
  const { thread } = props;

  const { isThreadOwner } = useIsThreadOwner();

  return (
    <div className="p-4 border rounded-lg shadow flex flex-col">
      <div className="flex items-center justify-between">
        <Button asChild variant="link" className="mr-auto">
          <Link href="/community">
            <ArrowLeftIcon /> Back to Community
          </Link>
        </Button>
        {isThreadOwner && <CommunityThreadManagement thread={thread} />}
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center my-4 md:my-8">{thread.title}</h1>
      <div className="flex gap-2 mb-2">
        <CommunityThreadAuthorAvatar author={thread.author} />
        <div>
          <Link href={`/users/${thread.author.id}`}>
            <h2 className="text-lg">{thread.author.name}</h2>
          </Link>
          <CommunityThreadCreatedAt createdAt={thread.createdAt} />
        </div>
      </div>
      <CommunityThreadKeywords keywords={thread.keywords} />
    </div>
  );
};

export default CommunityThreadDetails;
