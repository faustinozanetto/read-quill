'use client';

import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';

import { useParams } from 'next/navigation';
import { useUserThreads } from '@modules/community/hooks/use-user-threads';
import CommunityThreadCardPlaceholder from '@modules/community/components/threads/card/community-thread-card-placeholder';
import { CommunityThreadCard } from '@modules/community/components/threads/card/community-thread-card';
import UserProfileThreadsHeader from './user-profile-threads-header';
import { ExclamationIcon } from '@read-quill/design-system';

const UserProfilThreads: React.FC = () => {
  const params = useParams<{ userId: string }>();
  const { data, isLoading } = useUserThreads({ pageSize: 6, userId: params.userId });

  const threads = data?.pages.flatMap((v) => v?.data?.threads ?? []) ?? [];

  return (
    <div className="flex flex-col gap-2 rounded-lg p-4 border">
      <UserProfileThreadsHeader />

      {isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CommunityThreadCardPlaceholder key={`thread-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!isLoading && threads.length ? (
        <div className="flex flex-col gap-2">
          {threads.map((thread) => {
            return (
              <CommunityThreadCard.Root key={`thread-${thread.id}`} thread={thread}>
                <CommunityThreadCard.Metadata>
                  <CommunityThreadCard.Votes />
                </CommunityThreadCard.Metadata>
                <CommunityThreadCard.Keywords />
                <CommunityThreadCard.Content />
                <div className="flex gap-2 items-center">
                  <CommunityThreadCard.Comments />
                  <CommunityThreadCard.Views />
                </div>
              </CommunityThreadCard.Root>
            );
          })}
        </div>
      ) : null}

      {!isLoading && !threads.length ? (
        <div className="flex items-center justify-center gap-2">
          <div className="bg-primary p-2 rounded-lg border">
            <ExclamationIcon className="stroke-primary-foreground" />
          </div>
          <p>It looks like this user hasn't posted threads yet!</p>
        </div>
      ) : null}
    </div>
  );
};

export default UserProfilThreads;
