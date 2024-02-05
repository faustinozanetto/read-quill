import React from 'react';
import { compareAsc, isBefore } from 'date-fns';
import type { Prisma } from '@read-quill/database';
import type { UserAchievementWithAchievement } from '@modules/achievements/types/achievements.types';
import type { UseFilterFilteringFunctions, UseFilterSortingFunctions } from '@modules/common/hooks/use-filter-data';
import { useFilterData } from '@modules/common/hooks/use-filter-data';
import UnLockedAchievementCard from '../../cards/un-lockeed/user-un-locked-achievement-card';
import AchievementsFeed from '../achievements-feed';
import UserUnLockedAchievementsFiltering from './user-un-locked-achievements-filtering';

interface UserUnLockedAchievementsFeedProps {
  userAchievements: UserAchievementWithAchievement[];
}

const UserUnLockedAchievementsFeed: React.FC<UserUnLockedAchievementsFeedProps> = (props) => {
  const { userAchievements } = props;

  const filterFunctions: UseFilterFilteringFunctions<UserAchievementWithAchievement> = {
    'achievement.name': (item, value) => item.achievement.name.toLowerCase().includes((value as string).toLowerCase()),
    'achievement.criteria': (item, value) => {
      const criterias = Object.keys(item.achievement.criteria as Prisma.JsonObject);

      return criterias.some((criteria) => (value as string[]).includes(criteria));
    },
    unlockedAt: (item, value) => {
      const unlockedAtDate = item.unlockedAt ? new Date(item.unlockedAt) : new Date();
      const beforeUnlockedAtDate = new Date(value as string);
      return isBefore(unlockedAtDate, beforeUnlockedAtDate);
    },
  };

  const sortFunctions: UseFilterSortingFunctions<UserAchievementWithAchievement> = {
    'achievement.name': (a, b) => a.achievement.name.localeCompare(b.achievement.name),
    unlockedAt: (a, b) => {
      const aDate = a.unlockedAt ? new Date(a.unlockedAt) : new Date();
      const bDate = b.unlockedAt ? new Date(b.unlockedAt) : new Date();

      return compareAsc(aDate, bDate);
    },
  };

  const { filteredData, sort, filters } = useFilterData<UserAchievementWithAchievement>({
    data: userAchievements,
    filterFunctions,
    sortFunctions,
  });

  return (
    <AchievementsFeed
      onRenderFilters={() => {
        return <UserUnLockedAchievementsFiltering filters={filters} sort={sort} />;
      }}
    >
      <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3 grow h-fit">
        {filteredData.map((userAchievement) => {
          return (
            <UnLockedAchievementCard
              key={`unlocked-achievement-${userAchievement.achievementId}`}
              userAchievement={userAchievement}
            />
          );
        })}
      </div>
    </AchievementsFeed>
  );
};

export default UserUnLockedAchievementsFeed;
