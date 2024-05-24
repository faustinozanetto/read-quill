import { __URL__ } from '@modules/common/lib/common.constants';
import CommunityThread from '@modules/community/components/threads/detailed/community-thread';
import { headers } from 'next/headers';

import React from 'react';

interface CommunityThreadPageProps {
  params: {
    threadId: string;
  };
}

const CommunityThreadPage: React.FC<CommunityThreadPageProps> = async (props) => {
  const { params } = props;
  const { threadId } = params;

  const url = new URL('/api/community/thread/view', __URL__);
  url.searchParams.set('threadId', threadId);
  const response = await fetch(url, {
    headers: headers(),
  });
  const data = await response.json();

  return (
    <div className="container mt-4">
      <CommunityThread threadId={threadId} />
    </div>
  );
};

export default CommunityThreadPage;
