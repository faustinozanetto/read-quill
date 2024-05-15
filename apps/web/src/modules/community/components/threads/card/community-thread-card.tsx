import React, { HTMLAttributes } from 'react';
import CommunityThreadCreatedAt from '../common/community-thread-created-at';
import CommunityThreadAuthorAvatar from '../common/community-thread-author-avatar';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import Link from 'next/link';
import CommunityThreadKeywords from '../common/community-thread-keywords';
import { ThumbsUpIcon, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, cn } from '@read-quill/design-system';

interface CommunityThreadCardRootProps {
  thread: ThreadWithDetails;
  children?: React.ReactNode;
}

const CommunityThreadCardRoot: React.FC<CommunityThreadCardRootProps> = (props) => {
  const { thread, children } = props;

  return (
    <Link
      href={`/community/threads/${thread.id}`}
      className="p-4 border rounded-lg shadow hover:scale-[101%] transition-transform"
    >
      {children}
    </Link>
  );
};

interface CommunityThreadCardMetadataProps {
  thread: ThreadWithDetails;
  children?: React.ReactNode;
}

const CommunityThreadCardMetadata: React.FC<CommunityThreadCardMetadataProps> = (props) => {
  const { thread, children } = props;

  return (
    <div className="flex gap-2 items-center mb-1">
      <CommunityThreadAuthorAvatar author={thread.author} />
      <div className="flex-1">
        <h3 className="font-bold">{thread.title}</h3>
        <CommunityThreadCreatedAt createdAt={thread.createdAt} />
      </div>
      {children}
    </div>
  );
};

interface CommunityThreadCardContentProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

const CommunityThreadCardContent: React.FC<CommunityThreadCardContentProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <p className={cn('line-clamp-2 text-sm md:text-base mt-0.5', className)} {...rest}>
      {children}
    </p>
  );
};

interface CommunityThreadCardKeywordsCommentsProps {
  thread: ThreadWithDetails;
}

const CommunityThreadCardKeywordsComments: React.FC<CommunityThreadCardKeywordsCommentsProps> = (props) => {
  const { thread } = props;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-1.5">
      <CommunityThreadKeywords keywords={thread.keywords} />
      <span className="ml-auto text-nowrap">
        <strong>{thread.commentsCount}</strong> comments
      </span>
    </div>
  );
};

interface CommunityThreadCardVotesProps {
  thread: ThreadWithDetails;
}

const CommunityThreadCardVotes: React.FC<CommunityThreadCardVotesProps> = (props) => {
  const { thread } = props;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="p-1.5 gap-0.5 rounded-lg border bg-primary flex items-center justify-center font-bold text-background">
            <ThumbsUpIcon />
            {thread.votes}
          </div>
        </TooltipTrigger>
        <TooltipContent>Thread Votes</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const CommunityThreadCard = {
  Root: CommunityThreadCardRoot,
  Metadata: CommunityThreadCardMetadata,
  Content: CommunityThreadCardContent,
  KeywordsComments: CommunityThreadCardKeywordsComments,
  Votes: CommunityThreadCardVotes,
};
