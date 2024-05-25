import { __URL__ } from '@modules/common/lib/common.constants';
import CommunityThread from '@modules/community/components/threads/detailed/community-thread';

import React from 'react';

interface CommunityThreadPageProps {
  params: {
    threadId: string;
  };
}

const CommunityThreadPage: React.FC<CommunityThreadPageProps> = async (props) => {
  const { params } = props;
  const { threadId } = params;

  return (
    <div className="container mt-4">
      <CommunityThread threadId={threadId} />
    </div>
  );
};

export default CommunityThreadPage;
