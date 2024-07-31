'use client';

import React from 'react';

import { useUserContext } from '@modules/users/hooks/use-user-context';
import { usePinnedAchievements } from '@modules/achievements/hooks/use-pinned-achievements';
import { Skeleton } from '@read-quill/design-system';
import UserProfileDetailsAchievementEntry from './user-profile-details-achievements-entry';

const UserProfileDetailsAchievements: React.FC = () => {
  const { user } = useUserContext((s) => s);

  const { data, isLoading } = usePinnedAchievements({
    userId: user.id,
  });

  if (isLoading)
    return (
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={`profile-achievement-placeholder-${index}`} className="h-4 w-20" />
        ))}
      </div>
    );

  if (data?.data?.pinnedAchievements.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {data?.data?.pinnedAchievements.map((pinnedAchievement) => (
        <UserProfileDetailsAchievementEntry
          key={`profile-achievement-${pinnedAchievement.id}`}
          pinnedAchievement={pinnedAchievement}
        />
      ))}
    </div>
  );
};

export default UserProfileDetailsAchievements;
