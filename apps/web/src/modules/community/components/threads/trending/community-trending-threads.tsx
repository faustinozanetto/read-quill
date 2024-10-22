'use client';

import React from 'react';

import CommunityThreadCardPlaceholder from '../card/community-thread-card-placeholder';
import { useCommunityTrendingThreads } from '@modules/community/hooks/use-community-trending-threads';
import { CommunityThreadCard } from '../card/community-thread-card';

const CommunityTrendingThreads: React.FC = () => {
  const { data, isLoading } = useCommunityTrendingThreads({
    pageSize: 4,
  });

  return (
    <div className="flex w-full flex-col border p-4 rounded-lg space-y-2 h-fit">
      <h1 className="text-2xl font-bold">🔥Trending Threads</h1>
      <p>
        {!isLoading && !data?.data?.threads.length
          ? 'Trending threads will appear here once people write some!'
          : 'Check out the latest trending threads!'}
      </p>

      {isLoading && (
        <div className="grid gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CommunityThreadCardPlaceholder key={`thread-placeholder-${i}`} />
          ))}
        </div>
      )}

      {!isLoading && data?.data?.threads.length ? (
        <div className="grid gap-2">
          {data.data.threads.map((thread) => {
            return (
              <CommunityThreadCard.Root key={`trending-thread-${thread.id}`} thread={thread}>
                <CommunityThreadCard.Metadata>
                  <CommunityThreadCard.Votes />
                </CommunityThreadCard.Metadata>
                <CommunityThreadCard.Content className="line-clamp-1" />
                <div className="flex gap-2 items-center">
                  <CommunityThreadCard.Comments />
                  <CommunityThreadCard.Views />
                </div>
              </CommunityThreadCard.Root>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default CommunityTrendingThreads;
