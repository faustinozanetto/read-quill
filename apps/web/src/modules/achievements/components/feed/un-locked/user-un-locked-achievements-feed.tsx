import React from 'react';
import { compareAsc, isBefore } from 'date-fns';
import type { Prisma } from '@read-quill/database';
import type { UserAchievementWithAchievement } from '@modules/achievements/types/achievements.types';
import type {
  Filter,
  NestedKeyOf,
  Sort,
  UseFilterFilteringFunctions,
  UseFilterSortingFunctions,
} from '@modules/common/hooks/use-filter';
import useFilter from '@modules/common/hooks/use-filter';
import UnLockedAchievementCard from '../../cards/un-lockeed/user-un-locked-achievement-card';
import AchievementsFeed from '../achievements-feed';
import UserUnLockedAchievementsFiltering from './user-un-locked-achievements-filtering';

interface UserUnLockedAchievementsFeedProps {
  userAchievements: UserAchievementWithAchievement[];
}

const UserUnLockedAchievementsFeed: React.FC<UserUnLockedAchievementsFeedProps> = (props) => {
  const { userAchievements } = props;

  const initialFilters: Filter<UserAchievementWithAchievement>[] = [
    { property: 'achievement.name', value: '', shouldEnable: (value) => value !== '' },
    { property: 'achievement.criteria', value: [], shouldEnable: (value) => (value as string[]).length > 0 },
    { property: 'unlockedAt', value: '', shouldEnable: (value) => value !== '' },
  ];

  const initialSort: Sort<UserAchievementWithAchievement> = { property: 'unlockedAt', ascending: false };

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

  const { filteredData, sort, filters, updateSort, updateFilterValue, resetFilters } =
    useFilter<UserAchievementWithAchievement>({
      data: userAchievements,
      initialFilters,
      initialSort,
      filterFunctions,
      sortFunctions,
    });

  const handleFilterNameChange = (value: string): void => {
    updateFilterValue('achievement.name', value);
  };

  const handleSortByChange = (value: NestedKeyOf<UserAchievementWithAchievement>, ascending: boolean): void => {
    updateSort({ property: value, ascending });
  };

  const handleFilterCriteriasChange = (value: string[]): void => {
    updateFilterValue('achievement.criteria', value);
  };

  const handleUlockedBeforeChange = (value: string): void => {
    updateFilterValue('unlockedAt', value);
  };

  return (
    <AchievementsFeed
      onRenderFilters={() => {
        return (
          <UserUnLockedAchievementsFiltering
            filters={filters}
            handleFilterCriteriasChange={handleFilterCriteriasChange}
            handleFilterNameChange={handleFilterNameChange}
            handleFilterUnlockedBeforeChange={handleUlockedBeforeChange}
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
