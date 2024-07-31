'use client';

import React from 'react';
import UserProfileAvatar from './avatar/user-profile-avatar';
import { useUserContext } from '@modules/users/hooks/use-user-context';
import { usePinnedAchievements } from '@modules/achievements/hooks/use-pinned-achievements';
import { Badge, Skeleton, ThropyIcon } from '@read-quill/design-system';

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
        <Badge>
          <ThropyIcon className="mr-2" /> {pinnedAchievement.name}
        </Badge>
      ))}
    </div>
  );
};

export default UserProfileDetailsAchievements;
