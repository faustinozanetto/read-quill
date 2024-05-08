'use client';

import React from 'react';
import { ThreadWithDetails } from '@modules/community/types/community.types.ts';
import { useThreadComments } from '@modules/community/hooks/use-thread-comments.ts';
import CommunityThreadComment from './community-thread-comment';
import CommunityThreadWriteComment from './write/community-thread-write-comment';
import { Virtuoso } from 'react-virtuoso';

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
      <CommunityThreadWriteComment />
      {data && data.comments && data.comments.length > 0 && (
        <Virtuoso
          style={{ height: 650 }}
          totalCount={data.comments.length}
          data={data.comments}
          itemContent={(index, commentNode) => (
            <CommunityThreadComment key={commentNode.comment.id} commentNode={commentNode} />
          )}
          components={{
            List: React.forwardRef((props, ref) => {
              return <div {...props} className="space-y-1.5 mr-2" ref={ref} />;
            }),
          }}
        />
        // <div className="space-y-1.5">
        //   {data.comments.map((commentNode) => (
        //     <CommunityThreadComment key={commentNode.comment.id} commentNode={commentNode} />
        //   ))}
        // </div>
      )}
      {data && data.comments && data.comments.length === 0 && <p>This thread has no comments, be the first one!</p>}
    </div>
  );
};

export default CommunityThreadComments;
