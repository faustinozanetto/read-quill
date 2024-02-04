import React from 'react';
import type { Prisma } from '@read-quill/database';
import type { AchievementWithProgress } from '@modules/achievements/types/achievements.types';
import type {
  Filter,
  NestedKeyOf,
  Sort,
  UseFilterFilteringFunctions,
  UseFilterSortingFunctions,
} from '@modules/common/hooks/use-filter';
import useFilter from '@modules/common/hooks/use-filter';
import AchievementsFeed from '../achievements-feed';
import UserLockedAchievementCard from '../../cards/locked/user-locked-achievement-card';
import UserLockedAchievementsFiltering from './user-locked-achievements-filtering';

interface UserLockedAchievementsFeedProps {
  userAchievements: AchievementWithProgress[];
}

const UserLockedAchievementsFeed: React.FC<UserLockedAchievementsFeedProps> = (props) => {
  const { userAchievements } = props;

  const initialFilters: Filter<AchievementWithProgress>[] = [
    { property: 'name', value: '', shouldEnable: (value) => value !== '' },
    { property: 'criteria', value: [], shouldEnable: (value) => (value as string[]).length > 0 },
    { property: 'completionPercentage', value: 0, shouldEnable: (value) => (value as number) !== 0 },
  ];

  const initialSort: Sort<AchievementWithProgress> = { property: 'completionPercentage', ascending: false };

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

  const { filteredData, sort, filters, updateSort, updateFilterValue, resetFilters } =
    useFilter<AchievementWithProgress>({
      data: userAchievements,
      initialFilters,
      initialSort,
      filterFunctions,
      sortFunctions,
    });

  const handleFilterNameChange = (value: string): void => {
    updateFilterValue('name', value);
  };

  const handleSortByChange = (value: NestedKeyOf<AchievementWithProgress>, ascending: boolean): void => {
    updateSort({ property: value, ascending });
  };

  const handleFilterCriteriasChange = (value: string[]): void => {
    updateFilterValue('criteria', value);
  };

  const handleFilterCompletionChange = (value: number): void => {
    updateFilterValue('completionPercentage', value);
  };

  return (
    <AchievementsFeed
      onRenderFilters={() => {
        return (
          <UserLockedAchievementsFiltering
            filters={filters}
            handleFilterCompletionChange={handleFilterCompletionChange}
            handleFilterCriteriasChange={handleFilterCriteriasChange}
            handleFilterNameChange={handleFilterNameChange}
            handleSortByChange={handleSortByChange}
            resetFilters={resetFilters}
            sort={sort}
          />
        );
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 items-start grow">
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
