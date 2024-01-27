import React from 'react';
import type { AchievementWithProgress } from '@modules/achievements/types/achievements.types';
import UserLockedAchievementCard from '../cards/locked/user-locked-achievement-card';

interface UserLockedAchievementsFeedProps {
  userAchievements: AchievementWithProgress[];
}

const UserLockedAchievementsFeed: React.FC<UserLockedAchievementsFeedProps> = (props) => {
  const { userAchievements } = props;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {userAchievements.map((userAchievement) => {
        return (
          <UserLockedAchievementCard key={`user-achievement-${userAchievement.id}`} userAchievement={userAchievement} />
        );
      })}
    </div>
  );
};

export default UserLockedAchievementsFeed;
