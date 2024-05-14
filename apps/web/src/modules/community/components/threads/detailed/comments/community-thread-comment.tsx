import React, { useState } from 'react';
import { ThreadCommentNode } from '@modules/community/types/community.types';
import CommunityThreadAuthorAvatar from '../../common/community-thread-author-avatar';
import Link from 'next/link';
import { cn } from '@read-quill/design-system';
import { useSession } from 'next-auth/react';
import CommunityThreadCommentManagement from './management/community-thread-comment-management';
import CommunityThreadReplyComment from './reply/community-thread-reply-comment';

const REPLIES_SPACING_PX = 8;

interface CommunityThreadCommentProps {
  commentNode: ThreadCommentNode;
  depth?: number;
  index?: number;
  isDepthZeroLastReply?: boolean;
  isRecursiveDepthLastReply?: boolean;
}

const CommunityThreadComment: React.FC<CommunityThreadCommentProps> = (props) => {
  const { commentNode, depth = 0, index = 0, isDepthZeroLastReply = false, isRecursiveDepthLastReply = false } = props;
  const { comment, replies } = commentNode;

  const { data: session } = useSession();
  const [lastReplyHeight, setLastReplyHeight] = useState<number | null>(null);

  return (
    <div
      className="flex flex-col relative"
      style={{
        gap: `${REPLIES_SPACING_PX}px`,
      }}
    >
      <div className="relative">
        <div className="py-2.5 px-4 border rounded-lg shadow flex flex-col">
          <div className="space-y-1 grow">
            {/* Details */}
            <div className="flex gap-2 items-center">
              <CommunityThreadAuthorAvatar author={comment.author} size="sm" />
              <div className="flex flex-col sm:items-center sm:gap-2 sm:flex-row">
                <Link href={`/users/${comment.author.id}`} className="font-medium leading-[12px] sm:leading-normal">
                  {comment.author.name}
                </Link>
                <span className="text-sm">
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </span>
              </div>
              {/* Management */}
              {session?.user.id === commentNode.comment.author.id && (
                <div className="ml-auto">
                  <CommunityThreadCommentManagement comment={commentNode.comment} />
                </div>
              )}
            </div>
            {/* Content */}
            <p className="text-sm">{comment.content}</p>
          </div>
          {/* Reply */}
          <div className="flex justify-between flex-row-reverse sm:flex-col items-end ml-auto mt-auto">
            <CommunityThreadReplyComment comment={comment} />
          </div>
        </div>
        {/* Horizontal Own Bar */}
        {depth > 0 && <div className="absolute -left-10 ml-5 top-1/2 w-5 bg-primary h-1 rounded-bl-lg" />}
        {/* Vertical Own Bar */}
        {index > 0 && depth > 0 && (
          <div
            className={cn('absolute left-0 bottom-0 -ml-5 bg-primary w-1', isRecursiveDepthLastReply && 'bottom-1/2')}
            style={{
              height: isDepthZeroLastReply ? `calc(50% + ${REPLIES_SPACING_PX}px)` : undefined,
              top: `-${REPLIES_SPACING_PX}px`,
            }}
          />
        )}
      </div>
      {/* Replies */}
      {replies.length > 0 && (
        <div
          className="relative ml-10 flex flex-col"
          style={{
            gap: `${REPLIES_SPACING_PX}px`,
          }}
        >
          {/* Vertical Section Bar For Connecting Replies */}
          <div
            className={cn('absolute left-0 bottom-0 -ml-5 bg-primary w-1')}
            style={{
              height: lastReplyHeight ? `calc(100% - ${lastReplyHeight}px)` : undefined,
              top: `-${REPLIES_SPACING_PX}px`,
            }}
          />

          {replies.map((reply, i) => {
            const isDepthZeroLastReply = depth === 0 && i === replies.length - 1;
            const isRecursiveDepthLastReply = depth >= 1 && i === replies.length - 1;

            return (
              <div
                key={`${comment.id}-reply-${reply.comment.id}`}
                className="relative"
                // Store the last reply height if the current reply is the last one to render.
                ref={i === replies.length - 1 ? (node) => setLastReplyHeight(node?.clientHeight ?? 0) : undefined}
              >
                {/* Nested comment */}
                <CommunityThreadComment
                  commentNode={reply}
                  isDepthZeroLastReply={isDepthZeroLastReply}
                  isRecursiveDepthLastReply={isRecursiveDepthLastReply}
                  index={(i + 1) * (index + 1)}
                  depth={depth + 1}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommunityThreadComment;
