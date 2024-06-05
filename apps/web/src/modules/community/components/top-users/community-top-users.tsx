'use client';

import { useCommunityTopUsers } from '@modules/community/hooks/use-community-top-users';
import React from 'react';
import CommunityTopUserCard from './card/community-top-user-card';
import CommunityTopUserCardPlaceholder from './card/community-top-user-card-placeholder';

const CommunityTopUsers: React.FC = () => {
  const { data, isLoading } = useCommunityTopUsers({ take: 6 });

  return (
    <div className="flex w-full flex-col border p-4 rounded-lg shadow">
      <h1 className="text-2xl font-bold">Top Users</h1>
      <p className="mb-2">Have a look at our top users in the community!</p>

      {isLoading && (
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CommunityTopUserCardPlaceholder key={`community-top-user-placeholder-${i}`} />
          ))}
        </div>
      )}

      {!isLoading && data?.data?.topUsers.length ? (
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {data.data.topUsers.map((topUser, index) => (
            <CommunityTopUserCard
              key={`community-top-user-${topUser.user.id}`}
              topUser={topUser}
              position={index + 1}
            />
          ))}
        </div>
      ) : null}

      {!isLoading && !data?.data?.topUsers.length ? (
        <p>
          No threads found! Be the first one by clicking the{' '}
          <span className="text-primary font-bold underline">Start a Thread</span> button to get started.
        </p>
      ) : null}
    </div>
  );
};

export default CommunityTopUsers;
