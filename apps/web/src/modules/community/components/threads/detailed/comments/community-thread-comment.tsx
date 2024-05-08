import React, { useState } from 'react';
import { ThreadCommentNode } from '@modules/community/types/community.types';
import CommunityThreadAuthorAvatar from '../../common/community-thread-author-avatar';
import Link from 'next/link';
import { cn } from '@read-quill/design-system';

const REPLIES_SPACING_PX = 8;

interface CommunityThreadCommentProps {
  commentNode: ThreadCommentNode;
  depth?: number;
  isDepthZeroLastReply?: boolean;
  isRecursiveDepthLastReply?: boolean;
}

const CommunityThreadComment: React.FC<CommunityThreadCommentProps> = (props) => {
  const { commentNode, depth = 0, isDepthZeroLastReply = false, isRecursiveDepthLastReply = false } = props;
  const { comment, replies } = commentNode;

  const [lastReplyHeight, setLastReplyHeight] = useState<number | null>(null);

  return (
    <div
      className="flex flex-col"
      style={{
        gap: `${REPLIES_SPACING_PX}px`,
      }}
    >
      {comment.author && (
        <div className="relative">
          <div
            className="p-2 border rounded-lg shadow flex"
            style={{
              gap: `${REPLIES_SPACING_PX}px`,
            }}
          >
            <CommunityThreadAuthorAvatar author={comment.author} size="sm" />
            <div>
              <div className="space-x-2">
                <Link href={`/users/${comment.author.id}`} className="font-medium">
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
              <p className="text-sm">{comment.content}</p>
            </div>
          </div>
          {/* Horizontal Own Bar */}
          {depth > 0 && <div className="absolute -left-10 ml-5 top-1/2 w-5 bg-primary h-1 rounded-bl-lg" />}
          {/* Vertical Own Bar */}
          <div
            className={cn('absolute left-0 bottom-0 -ml-5 bg-primary w-1', isRecursiveDepthLastReply && 'bottom-1/2')}
            style={{
              height: isDepthZeroLastReply ? `calc(50% + ${REPLIES_SPACING_PX}px)` : undefined,
              top: `-${REPLIES_SPACING_PX}px`,
            }}
          />
        </div>
      )}

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

          {replies.map((reply, index) => {
            const isDepthZeroLastReply = depth === 0 && index === replies.length - 1;
            const isRecursiveDepthLastReply = depth >= 1 && index === replies.length - 1;

            return (
              <div
                key={`${comment.id}-reply-${reply.comment.id}`}
                className="relative"
                // Store the last reply height if the current reply is the last one to render.
                ref={index === replies.length - 1 ? (node) => setLastReplyHeight(node?.clientHeight ?? 0) : undefined}
              >
                {/* Nested comment */}
                <CommunityThreadComment
                  commentNode={reply}
                  isDepthZeroLastReply={isDepthZeroLastReply}
                  isRecursiveDepthLastReply={isRecursiveDepthLastReply}
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
