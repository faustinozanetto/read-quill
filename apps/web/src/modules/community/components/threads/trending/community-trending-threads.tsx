'use client';

import React from 'react';

import CommunityThreadCardPlaceholder from '../card/community-thread-card-placeholder';
import { useCommunityTrendingThreads } from '@modules/community/hooks/use-community-trending-threads';
import CommunityThreadCard from '../card/community-thread-card';

const CommunityTrendingThreads: React.FC = () => {
  const { data, isLoading, isFetching } = useCommunityTrendingThreads({
    pageSize: 6,
  });

  return (
    <div className="flex w-full flex-col border p-4 rounded-lg shadow">
      <h1 className="text-2xl font-bold">🔥Trending Threads</h1>
      <p className="mb-2">Check out the most upvoted threads in the past weeks!</p>

      {(isFetching || isLoading) && (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CommunityThreadCardPlaceholder key={`thread-placeholder-${i}`} className="xl:w-[500px]" />
          ))}
        </div>
      )}

      {!(isFetching || isLoading) && data && data.threads.length > 0 && (
        <div className="flex flex-col gap-2">
          {data.threads.map((thread) => {
            return <CommunityThreadCard thread={thread} key={`thread-${thread.id}`} />;
          })}
        </div>
      )}

      {!(isFetching || isLoading) && data && data.threads.length === 0 ? (
        <p>
          No threads found! Be the first one by clicking the{' '}
          <span className="text-primary font-bold underline">Start a Thread</span> button to get started.
        </p>
      ) : null}
    </div>
  );
};

export default CommunityTrendingThreads;
