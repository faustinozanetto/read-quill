'use client';

import React from 'react';
import CommunityThreadDetails from './details/community-thread-details';
import CommunityThreadAttachments from '../attachments/community-thread-attachments';

import { useFetchThread } from '@modules/community/hooks/threads/use-fetch-thread';
import dynamic from 'next/dynamic';

const CommunityThreadComments = dynamic(() => import('./comments/community-thread-comments'));

interface CommunityThreadProps {
  threadId: string;
}

const CommunityThread: React.FC<CommunityThreadProps> = (props) => {
  const { threadId } = props;

  useFetchThread({ threadId });

  return (
    <section className="mx-auto flex flex-col gap-4">
      <CommunityThreadDetails />
      <CommunityThreadAttachments />
      <CommunityThreadComments />
    </section>
  );
};

export default CommunityThread;
