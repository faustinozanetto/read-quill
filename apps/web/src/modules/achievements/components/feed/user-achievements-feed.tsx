import React from 'react';
import type { UserAchievementWithAchievement } from '@modules/achievements/types/achievements.types';
import AchievementCard from '../cards/user-achievement-card';

interface UserAchievementsFeedProps {
  userAchievements: UserAchievementWithAchievement[];
}

const UserAchievementsFeed: React.FC<UserAchievementsFeedProps> = (props) => {
  const { userAchievements } = props;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {userAchievements.map((userAchievement) => {
        return (
          <AchievementCard
            key={`user-achievement-${userAchievement.achievementId}`}
            userAchievement={userAchievement}
          />
        );
      })}
    </div>
  );
};

export default UserAchievementsFeed;
