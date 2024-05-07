'use client';

import React from 'react';
import { ThreadWithDetails } from '@modules/community/types/community.types.ts';
import { useThreadComments } from '@modules/community/hooks/use-thread-comments.ts';
import CommunityThreadAuthor from '../common/community-thread-author';
import CommunityThreadKeywords from '../common/community-thread-keywords';
import CommunityThreadCreatedAt from '../common/community-thread-created-at';
import Link from 'next/link';
import { ArrowLeftIcon, Button } from '@read-quill/design-system';

interface CommunityThreadProps {
  thread: ThreadWithDetails;
}

const CommunityThread: React.FC<CommunityThreadProps> = (props) => {
  const { thread } = props;

  const {} = useThreadComments({ pageSize: 3, threadId: thread.id });

  return (
    <section className="mx-auto flex flex-col gap-4">
      <div className="p-4 border rounded-lg shadow flex flex-col">
        <div className="flex flex-col items-end sm:items-center sm:flex-row justify-between">
          <Button asChild variant="link" className="mr-auto">
            <Link href="/community/threads">
              <ArrowLeftIcon /> Back to Community
            </Link>
          </Button>
          <CommunityThreadKeywords keywords={thread.keywords} />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center my-4 md:my-8">{thread.title}</h1>
        <div className="flex gap-2 mb-2">
          <CommunityThreadAuthor author={thread.author} />
          <div>
            <h2 className="text-lg">{thread.author.name}</h2>
            <CommunityThreadCreatedAt createdAt={thread.createdAt} />
          </div>
        </div>
      </div>
      <div className="p-4 border rounded-lg shadow">{thread.content}</div>
    </section>
  );
};

export default CommunityThread;
