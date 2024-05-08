'use client';

import React from 'react';
import { ThreadWithDetails } from '@modules/community/types/community.types.ts';
import { useThreadComments } from '@modules/community/hooks/use-thread-comments.ts';
import CommunityThreadComment from './community-thread-comment';

interface CommunityThreadCommentsProps {
  thread: ThreadWithDetails;
}

const CommunityThreadComments: React.FC<CommunityThreadCommentsProps> = (props) => {
  const { thread } = props;

  const { data } = useThreadComments({ pageSize: 1000, threadId: thread.id });

  return (
    <div className="flex flex-col gap-2">
      <div className="p-4 border rounded-lg shadow flex flex-col">
        <h3 className="text-xl font-bold">Comments</h3>
      </div>

      <div>
        {data && data.comments && data.comments.length > 0 && (
          <div className="space-y-1.5">
            {data.comments.map((commentNode) => (
              <CommunityThreadComment key={commentNode.comment.id} commentNode={commentNode} />
            ))}
          </div>
        )}

        {data && data.comments && data.comments.length === 0 && <p>This thread has no comments, be the first one!</p>}
      </div>
    </div>
  );
};

export default CommunityThreadComments;
