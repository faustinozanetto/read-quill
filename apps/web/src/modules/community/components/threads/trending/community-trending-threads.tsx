'use client';

import React from 'react';

import CommunityThreadCardPlaceholder from '../card/community-thread-card-placeholder';
import { useCommunityTrendingThreads } from '@modules/community/hooks/use-community-trending-threads';
import { CommunityThreadCard } from '../card/community-thread-card';

const CommunityTrendingThreads: React.FC = () => {
  const { data, isLoading, isFetching } = useCommunityTrendingThreads({
    pageSize: 6,
  });

  return (
    <div className="flex w-full flex-col border p-4 rounded-lg shadow space-y-2">
      <h1 className="text-2xl font-bold">🔥Trending Threads</h1>
      <p>
        {data && data.threads.length === 0 && !(isLoading || isFetching)
          ? 'Trending threads will appear here once people write some!'
          : 'Check out the latest trending threads!'}
      </p>

      {(isFetching || isLoading) && (
        <div className="grid xl:grid-cols-2 2xl:grid-cols-1 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CommunityThreadCardPlaceholder key={`thread-placeholder-${i}`} />
          ))}
        </div>
      )}

      {!(isFetching || isLoading) && data && data.threads.length > 0 && (
        <div className="grid xl:grid-cols-2 2xl:grid-cols-1 gap-2">
          {data.threads.map((thread) => {
            return (
              <CommunityThreadCard.Root key={`trending-thread-${thread.id}`} thread={thread}>
                <CommunityThreadCard.Metadata thread={thread}>
                  <CommunityThreadCard.Votes thread={thread} />
                </CommunityThreadCard.Metadata>
                <CommunityThreadCard.Content className="line-clamp-1">{thread.content}</CommunityThreadCard.Content>
              </CommunityThreadCard.Root>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommunityTrendingThreads;
