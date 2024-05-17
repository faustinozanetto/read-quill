'use client';

import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';

import { useParams } from 'next/navigation';
import { useUserThreads } from '@modules/community/hooks/use-user-threads';
import CommunityThreadCardPlaceholder from '@modules/community/components/threads/card/community-thread-card-placeholder';
import { CommunityThreadCard } from '@modules/community/components/threads/card/community-thread-card';
import UserProfileThreadsHeader from './user-profile-threads-header';

const UserProfilThreads: React.FC = () => {
  const params = useParams<{ userId: string }>();
  const { data, isFetching, isLoading } = useUserThreads({ pageSize: 6, userId: params.userId });

  const threads = data?.pages.flatMap((v) => v.threads) ?? [];

  return (
    <div className="flex flex-col gap-2 rounded-lg p-4 shadow border">
      <UserProfileThreadsHeader />

      {isLoading || isFetching ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CommunityThreadCardPlaceholder key={`thread-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!(isLoading || isFetching) && threads.length > 0 && (
        <div className="flex flex-col gap-2">
          {threads.map((thread) => {
            return (
              <CommunityThreadCard.Root key={`thread-${thread.id}`} thread={thread}>
                <CommunityThreadCard.Metadata thread={thread}>
                  <CommunityThreadCard.Votes thread={thread} />
                </CommunityThreadCard.Metadata>
                <CommunityThreadCard.KeywordsComments thread={thread} />
                <CommunityThreadCard.Content>{thread.content}</CommunityThreadCard.Content>
              </CommunityThreadCard.Root>
            );
          })}
        </div>
      )}

      {!(isFetching || isLoading) && threads.length === 0 ? (
        <p>It looks like this user hasn't posted threads yet!</p>
      ) : null}
    </div>
  );
};

export default UserProfilThreads;
