'use client';

import { useCommunityTopUsers } from '@modules/community/hooks/use-community-top-users';
import React from 'react';
import CommunityTopUserCard from './card/community-top-user-card';
import CommunityTopUserCardPlaceholder from './card/community-top-user-card-placeholder';

const CommunityTopUsers: React.FC = () => {
  const { data, isLoading, isFetching } = useCommunityTopUsers({ take: 8 });

  return (
    <div className="flex w-full flex-col border p-4 rounded-lg shadow">
      <h1 className="text-2xl font-bold">Top Users</h1>
      <p className="mb-2">Have a look at our top users in the community!</p>

      {(isFetching || isLoading) && (
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <CommunityTopUserCardPlaceholder key={`community-top-user-placeholder-${i}`} />
          ))}
        </div>
      )}

      {!(isFetching || isLoading) && data && data.topUsers.length > 0 && (
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {data.topUsers.map((topUser) => (
            <CommunityTopUserCard key={`community-top-user-${topUser.user.id}`} topUser={topUser} />
          ))}
        </div>
      )}

      {!(isFetching || isLoading) && data && data.topUsers.length === 0 ? (
        <p>
          No threads found! Be the first one by clicking the{' '}
          <span className="text-primary font-bold underline">Start a Thread</span> button to get started.
        </p>
      ) : null}
    </div>
  );
};

export default CommunityTopUsers;
