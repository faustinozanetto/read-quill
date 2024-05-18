'use client';

import { __URL__ } from '@modules/common/lib/common.constants';
import CommunityThread from '@modules/community/components/threads/detailed/community-thread';
import CommunityThreadPlaceholder from '@modules/community/components/threads/detailed/community-thread-placeholder';
import { useCommunityThreadStore } from '@modules/community/state/state/community-thread.slice';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface CommunityThreadPageProps {
  params: {
    threadId: string;
  };
}

const CommunityThreadPage: React.FC<CommunityThreadPageProps> = (props) => {
  const { params } = props;
  const { threadId } = params;

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
    <div className="container mt-4">
      {(isFetching || isLoading) && <CommunityThreadPlaceholder />}
      {!(isFetching || isLoading) && thread && <CommunityThread thread={thread} />}
    </div>
  );
};

export default CommunityThreadPage;
