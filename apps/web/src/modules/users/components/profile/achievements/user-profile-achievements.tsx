'use client';

import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';

import { useParams } from 'next/navigation';
import CommunityThreadCardPlaceholder from '@modules/community/components/threads/card/community-thread-card-placeholder';

import UserProfileAchievementsHeader from './user-profile-achievements-header';
import { useUnLockedAchievements } from '@modules/achievements/hooks/use-un-locked-achievements';
import UserUnLockedAchievementCard from '@modules/achievements/components/cards/un-lockeed/user-un-locked-achievement-card';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

const UserProfilAchievements: React.FC = () => {
  const params = useParams<{ userId: string }>();
  const { user } = useAuthContext();

  const { data, isLoading } = useUnLockedAchievements({ userId: params.userId });

  const isProfileOwner = Boolean(user?.id === params.userId);

  return (
    <div className="flex flex-col gap-2 rounded-lg p-4 shadow border">
      <UserProfileAchievementsHeader />

      {isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CommunityThreadCardPlaceholder key={`thread-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!isLoading && data?.data?.unLockedAchievements.length ? (
        <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grow h-fit">
          {data.data.unLockedAchievements.map((unlockedAchievement) => (
            <UserUnLockedAchievementCard
              key={`unlocked-achievement-card-${unlockedAchievement.id}`}
              userAchievement={unlockedAchievement}
              showPinButton={isProfileOwner}
            />
          ))}
        </div>
      ) : null}

      {!isLoading && !data?.data?.unLockedAchievements.length ? (
        <p>It looks like this user hasn't unlocked achievements yet!</p>
      ) : null}
    </div>
  );
};

export default UserProfilAchievements;
