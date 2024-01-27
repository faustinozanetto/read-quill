import React from 'react';
import type { UserAchievementWithAchievement } from '@modules/achievements/types/achievements.types';
import UnLockedAchievementCard from '../cards/un-lockeed/user-un-locked-achievement-card';

interface UserUnLockedAchievementsFeedProps {
  userAchievements: UserAchievementWithAchievement[];
}

const UserUnLockedAchievementsFeed: React.FC<UserUnLockedAchievementsFeedProps> = (props) => {
  const { userAchievements } = props;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {userAchievements.map((userAchievement) => {
        return (
          <UnLockedAchievementCard
            key={`user-achievement-${userAchievement.achievementId}`}
            userAchievement={userAchievement}
          />
        );
      })}
    </div>
  );
};

export default UserUnLockedAchievementsFeed;
