'use client';

import React from 'react';
import { ThreadWithDetails } from '@modules/community/types/community.types.ts';
import CommunityThreadComments from './comments/community-thread-comments';
import CommunityThreadDetails from './details/community-thread-details';
import CommunityThreadAttachments from '../attachments/community-thread-attachments';
import { useQuery } from '@tanstack/react-query';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useCommunityThreadStore } from '@modules/community/state/community-thread.slice';
import CommunityThreadPlaceholder from './community-thread-placeholder';

interface CommunityThreadProps {
  threadId: string;
}

const CommunityThread: React.FC<CommunityThreadProps> = (props) => {
  const { threadId } = props;

  const { setThread, thread } = useCommunityThreadStore();

  const { isFetching, isLoading } = useQuery<ThreadWithDetails>(['community-thread', threadId], {
    queryFn: async () => {
      const url = new URL('/api/community/thread', __URL__);
      url.searchParams.set('threadId', threadId);

      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch thread!');
      }

      const { thread }: { thread: ThreadWithDetails } = await response.json();
      return thread;
    },
    onSuccess(data) {
      setThread(data);
    },
  });

  return (
    <section className="mx-auto flex flex-col gap-4">
      {(isFetching || isLoading) && <CommunityThreadPlaceholder />}
      {!(isFetching || isLoading) && thread && (
        <>
          <CommunityThreadDetails thread={thread} />
          <CommunityThreadAttachments threadId={thread.id} />
          <CommunityThreadComments thread={thread} />
        </>
      )}
    </section>
  );
};

export default CommunityThread;
