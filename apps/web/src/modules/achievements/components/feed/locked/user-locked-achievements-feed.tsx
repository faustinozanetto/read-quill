import React from 'react';
import type { Prisma } from '@read-quill/database';
import type { AchievementWithProgress } from '@modules/achievements/types/achievements.types';
import type { UseFilterFilteringFunctions, UseFilterSortingFunctions } from '@modules/filters/hooks/use-filter-data';
import { useFilterData } from '@modules/filters/hooks/use-filter-data';
import FiltersShell from '@modules/filters/components/filters-shell';
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
    <FiltersShell
      onRenderFilters={() => {
        return <UserLockedAchievementsFiltering filters={filters} sort={sort} />;
      }}
    >
      <div className="max-h-[600px] overflow-y-auto grid gap-2.5 p-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 grow h-fit">
        {filteredData.map((userAchievement) => {
          return (
            <UserLockedAchievementCard
              key={`locked-achievement-${userAchievement.id}`}
              userAchievement={userAchievement}
            />
          );
        })}
      </div>
    </FiltersShell>
  );
};

export default UserLockedAchievementsFeed;
