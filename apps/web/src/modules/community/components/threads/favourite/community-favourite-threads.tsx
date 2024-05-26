'use client';

import React from 'react';

import CommunityThreadCardPlaceholder from '../card/community-thread-card-placeholder';
import { CommunityThreadCard } from '../card/community-thread-card';
import { useCommunityFavouriteThreads } from '@modules/community/hooks/use-community-favourite-threads';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

const CommunityFavouriteThreads: React.FC = () => {
  const user = useAuthContext((s) => s.user);
  const { data, isLoading, isFetching } = useCommunityFavouriteThreads({
    pageSize: 6,
    userId: user?.id,
  });

  const threads = data?.pages.flatMap((v) => v.threads) ?? [];

  return (
    <div className="flex w-full flex-col border p-4 rounded-lg shadow space-y-2">
      <h1 className="text-2xl font-bold">💖 Favourite Threads</h1>
      <p>
        {threads.length === 0 && !(isLoading || isFetching)
          ? 'Your favourite threads will appear here once you add some!'
          : 'Check out your favourite threads!'}
      </p>

      {(isFetching || isLoading) && (
        <div className="grid gap-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <CommunityThreadCardPlaceholder key={`thread-placeholder-${i}`} />
          ))}
        </div>
      )}

      {!(isFetching || isLoading) && threads.length > 0 && (
        <div className="grid gap-2">
          {threads.map((thread) => {
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
      )}
    </div>
  );
};

export default CommunityFavouriteThreads;
