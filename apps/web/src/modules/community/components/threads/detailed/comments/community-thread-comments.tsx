'use client';

import React, { lazy } from 'react';
import { ThreadWithDetails } from '@modules/community/types/community.types.ts';
import { useThreadComments } from '@modules/community/hooks/threads/use-thread-comments';
import CommunityThreadWriteComment from './write/community-thread-write-comment';
import CommunityThreadCommentPlaceholder from './community-thread-comment-placeholder';

const CommunityThreadComment = lazy(() => import('./community-thread-comment'));

interface CommunityThreadCommentsProps {
  thread: ThreadWithDetails;
}

const CommunityThreadComments: React.FC<CommunityThreadCommentsProps> = (props) => {
  const { thread } = props;

  const { data, isFetching, isLoading } = useThreadComments({ pageSize: 1000, threadId: thread.id });

  return (
    <div className="flex flex-col gap-2">
      <div className="p-4 border rounded-lg shadow flex flex-col">
        <h3 className="text-xl font-bold">Comments</h3>
      </div>
      <CommunityThreadWriteComment />

      {isFetching || isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <CommunityThreadCommentPlaceholder key={`thread-comment-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!(isFetching || isLoading) && data.comments.length > 0 ? (
        <div className="space-y-1.5">
          {data.comments.map((commentNode, index) => (
            <CommunityThreadComment key={commentNode.comment.id} commentNode={commentNode} index={index} />
          ))}
        </div>
      ) : null}

      {!(isFetching || isLoading) && data.comments.length === 0 ? (
        <div className="rounded-lg p-4 shadow border space-y-4">
          <p>
            This thread has no comments! Be the first one by clicking the{' '}
            <span className="text-primary font-bold underline">Post</span> button to get started.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default CommunityThreadComments;
