'use client';

import React from 'react';

import CommunityThreadCardPlaceholder from '../card/community-thread-card-placeholder';
import { CommunityThreadCard } from '../card/community-thread-card';
import { useCommunityFavouriteThreads } from '@modules/community/hooks/use-community-favourite-threads';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

const CommunityFavouriteThreads: React.FC = () => {
  const { user } = useAuthContext();
  const { data, isLoading } = useCommunityFavouriteThreads({
    pageSize: 4,
    userId: user?.id,
  });

  const threads = data?.pages.flatMap((v) => v?.data?.threads ?? []) ?? [];

  return (
    <div className="flex w-full flex-col border p-4 rounded-lg space-y-2">
      <h1 className="text-2xl font-bold">💖 Favourite Threads</h1>
      <p>
        {!isLoading && !threads.length
          ? 'Your favourite threads will appear here once you add some!'
          : 'Check out your favourite threads!'}
      </p>

      {isLoading && (
        <div className="grid gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CommunityThreadCardPlaceholder key={`thread-placeholder-${i}`} />
          ))}
        </div>
      )}

      {!isLoading && threads.length ? (
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
      ) : null}
    </div>
  );
};

export default CommunityFavouriteThreads;
