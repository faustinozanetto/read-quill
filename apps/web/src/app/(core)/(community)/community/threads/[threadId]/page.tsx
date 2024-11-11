import { siteConfig } from '@config/config';
import { __URL__ } from '@modules/common/lib/common.constants';
import CommunityThread from '@modules/community/components/threads/detailed/community-thread';
import { prisma } from '@read-quill/database';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import React from 'react';

interface CommunityThreadPageProps {
  params: Promise<{
    threadId: string;
  }>;
}

export async function generateMetadata(
  { params }: CommunityThreadPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const threadId = (await params).threadId;

  const thread = await prisma.thread.findUnique({ where: { id: threadId } });
  if (!thread) return {};

  const previousImages = (await parent).openGraph?.images || [];
  const title = `${thread.title} | ${siteConfig.name}`;
  const description = `${thread.content.slice(0, 250)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [...previousImages],
    },
    twitter: {
      title,
      description,
      images: [...previousImages],
    },
  };
}

const CommunityThreadPage: React.FC<CommunityThreadPageProps> = async (props) => {
  const { params } = props;
  const { threadId } = await params;

  const threadCount = await prisma.thread.count({ where: { id: threadId } });
  if (threadCount === 0) {
    return notFound();
  }

  return <CommunityThread threadId={threadId} />;
};

export default CommunityThreadPage;
