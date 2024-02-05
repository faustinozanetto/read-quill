import React from 'react';
import type { Prisma } from '@read-quill/database';
import type { AchievementWithProgress } from '@modules/achievements/types/achievements.types';
import type { UseFilterFilteringFunctions, UseFilterSortingFunctions } from '@modules/common/hooks/use-filter-data';
import { useFilterData } from '@modules/common/hooks/use-filter-data';
import AchievementsFeed from '../achievements-feed';
import UserLockedAchievementCard from '../../cards/locked/user-locked-achievement-card';
import UserLockedAchievementsFiltering from './user-locked-achievements-filtering';

interface UserLockedAchievementsFeedProps {
  userAchievements: AchievementWithProgress[];
}

const UserLockedAchievementsFeed: React.FC<UserLockedAchievementsFeedProps> = (props) => {
  const { userAchievements } = props;

  const filterFunctions: UseFilterFilteringFunctions<AchievementWithProgress> = {
    name: (item, value) => item.name.toLowerCase().includes((value as string).toLowerCase()),
    criteria: (item, value) => {
      const criterias = Object.keys(item.criteria as Prisma.JsonObject);

      return criterias.some((criteria) => (value as string[]).includes(criteria));
    },
    completionPercentage: (item, value) => (value as number) >= item.completionPercentage,
  };

  const sortFunctions: UseFilterSortingFunctions<AchievementWithProgress> = {
    name: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    completionPercentage: (a, b) => {
      return a.completionPercentage >= b.completionPercentage ? 1 : -1;
    },
  };

  const { filteredData, sort, filters } = useFilterData<AchievementWithProgress>({
    data: userAchievements,
    filterFunctions,
    sortFunctions,
  });

  return (
    <AchievementsFeed
      onRenderFilters={() => {
        return <UserLockedAchievementsFiltering filters={filters} sort={sort} />;
      }}
    >
      <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3 grow h-fit">
        {filteredData.map((userAchievement) => {
          return (
            <UserLockedAchievementCard
              key={`locked-achievement-${userAchievement.id}`}
              userAchievement={userAchievement}
            />
          );
        })}
      </div>
    </AchievementsFeed>
  );
};

export default UserLockedAchievementsFeed;
