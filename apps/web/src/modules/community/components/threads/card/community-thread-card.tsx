import React, { HTMLAttributes, useContext } from 'react';
import CommunityThreadCreatedAt from '../common/community-thread-created-at';
import CommunityThreadAuthorAvatar from '../common/community-thread-author-avatar';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import Link from 'next/link';
import CommunityThreadKeywords from '../common/community-thread-keywords';
import {
  EyeIcon,
  MessagesIcon,
  ThumbsUpIcon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from '@read-quill/design-system';

const CommunityThreadCardContext = React.createContext<{ thread: ThreadWithDetails }>({
  thread: {} as ThreadWithDetails,
});

const useCommunityThreadCardContext = () => {
  const context = useContext(CommunityThreadCardContext);
  if (!context) throw new Error('Tried to use CommunityThreadCardContext outside its provider!');

  return context;
};

interface CommunityThreadCardProviderProps {
  children: React.ReactNode;
  thread: ThreadWithDetails;
}

const CommunityThreadCardProvider: React.FC<CommunityThreadCardProviderProps> = (props) => {
  const { children, thread } = props;

  return <CommunityThreadCardContext.Provider value={{ thread }}>{children}</CommunityThreadCardContext.Provider>;
};

interface CommunityThreadCardRootProps {
  thread: ThreadWithDetails;
  children?: React.ReactNode;
}

const CommunityThreadCardRoot: React.FC<CommunityThreadCardRootProps> = (props) => {
  const { thread, children } = props;

  return (
    <CommunityThreadCardProvider thread={thread}>
      <Link href={`/community/threads/${thread.id}`} className="p-4 border shadow rounded-lg hover:border-primary">
        {children}
      </Link>
    </CommunityThreadCardProvider>
  );
};

interface CommunityThreadCardMetadataProps {
  children?: React.ReactNode;
}

const CommunityThreadCardMetadata: React.FC<CommunityThreadCardMetadataProps> = (props) => {
  const { children } = props;

  const { thread } = useCommunityThreadCardContext();

  return (
    <div className="flex gap-2 items-center mb-1.5">
      <CommunityThreadAuthorAvatar author={thread.author} />
      <div className="flex-1">
        <h3 className="font-bold">{thread.title}</h3>
        <CommunityThreadCreatedAt createdAt={thread.createdAt} />
      </div>
      {children}
    </div>
  );
};

interface CommunityThreadCardContentProps extends Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> {}

const CommunityThreadCardContent: React.FC<CommunityThreadCardContentProps> = (props) => {
  const { className, ...rest } = props;
  const { thread } = useCommunityThreadCardContext();

  return (
    <p className={cn('line-clamp-2 my-1', className)} {...rest}>
      {thread.content}
    </p>
  );
};

const CommunityThreadCardKeywords: React.FC = () => {
  const { thread } = useCommunityThreadCardContext();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-1.5">
      <CommunityThreadKeywords keywords={thread.keywords} />
    </div>
  );
};

const CommunityThreadCardComments: React.FC = () => {
  const { thread } = useCommunityThreadCardContext();

  return (
    <div className="flex gap-1 items-center">
      <MessagesIcon /> <span className="text-sm">{thread.commentsCount} comments</span>
    </div>
  );
};

const CommunityThreadCardViews: React.FC = () => {
  const { thread } = useCommunityThreadCardContext();

  return (
    <div className="flex gap-1 items-center">
      <EyeIcon /> <span className="text-sm">{thread.commentsCount} views</span>
    </div>
  );
};

const CommunityThreadCardVotes: React.FC = () => {
  const { thread } = useCommunityThreadCardContext();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="p-1.5 gap-0.5 rounded-lg border bg-primary flex items-center justify-center font-bold text-background">
          <ThumbsUpIcon />
          {thread.votes}
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
  Keywords: CommunityThreadCardKeywords,
  Comments: CommunityThreadCardComments,
  Views: CommunityThreadCardViews,
  Votes: CommunityThreadCardVotes,
};
