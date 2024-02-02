import React from 'react';
import type { UserAchievementWithAchievement } from '@modules/achievements/types/achievements.types';
import type {
  Filter,
  NestedKeyOf,
  Sort,
  UseFilterFilteringFunctions,
  UseFilterSortingFunctions,
} from '@modules/common/hooks/use-filter';
import useFilter from '@modules/common/hooks/use-filter';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  buttonVariants,
  SortAscIcon,
  Button,
} from '@read-quill/design-system';
import { compareAsc } from 'date-fns';
import type { Prisma } from '@read-quill/database';
import UnLockedAchievementCard from '../../cards/un-lockeed/user-un-locked-achievement-card';
import UserUnLockedAchievementsFilteringName from './filtering/user-un-locked-achievements-filtering-name';
import UserUnLockedAchievementsSorting from './filtering/user-un-locked-achievements-sorting';
import UserUnLockedAchievementsFilteringCriterias from './filtering/user-un-locked-achievements-filtering-criterias';

interface UserUnLockedAchievementsFeedProps {
  userAchievements: UserAchievementWithAchievement[];
}

const UserUnLockedAchievementsFeed: React.FC<UserUnLockedAchievementsFeedProps> = (props) => {
  const { userAchievements } = props;

  const initialFilters: Filter<UserAchievementWithAchievement>[] = [
    { property: 'achievement.name', value: '', shouldEnable: (value) => value !== '' },
    { property: 'achievement.criteria', value: [], shouldEnable: (value) => (value as string[]).length > 0 },
  ];

  const initialSort: Sort<UserAchievementWithAchievement> = { property: 'unlockedAt', ascending: false };

  const filteringFunctinons: UseFilterFilteringFunctions<UserAchievementWithAchievement> = {
    'achievement.name': (item, value) => item.achievement.name.toLowerCase().includes((value as string).toLowerCase()),
    'achievement.criteria': (item, value) => {
      const criterias = Object.keys(item.achievement.criteria as Prisma.JsonObject);

      return criterias.some((criteria) => (value as string[]).includes(criteria));
    },
  };

  const sortingFunctions: UseFilterSortingFunctions<UserAchievementWithAchievement> = {
    'achievement.name': (a, b) => a.achievement.name.localeCompare(b.achievement.name),
    unlockedAt: (a, b, ascending) => {
      const aDate = a.unlockedAt ? new Date(a.unlockedAt) : new Date();
      const bDate = b.unlockedAt ? new Date(b.unlockedAt) : new Date();

      const order = ascending ? 1 : -1;
      return compareAsc(aDate, bDate) * order;
    },
  };

  const { filteredData, sort, filters, updateSort, updateFilterValue, resetFilters } =
    useFilter<UserAchievementWithAchievement>(
      userAchievements,
      initialFilters,
      initialSort,
      filteringFunctinons,
      sortingFunctions
    );

  const handleFilterNameChange = (value: string): void => {
    updateFilterValue('achievement.name', value);
  };

  const handleSortByChange = (value: NestedKeyOf<UserAchievementWithAchievement>, ascending: boolean): void => {
    updateSort({ property: value, ascending });
  };

  const handleFilterCriteriasChange = (value: string[]): void => {
    updateFilterValue('achievement.criteria', value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Sheet>
        <SheetTrigger className={buttonVariants({ className: 'ml-auto' })}>
          <SortAscIcon className="mr-2" /> Filters & Sort
        </SheetTrigger>
        <SheetContent className="w-[300px] flex flex-col">
          <SheetHeader className="mb-2">
            <SheetTitle>Filtering & Sorting</SheetTitle>
          </SheetHeader>
          <div className="space-y-2">
            <UserUnLockedAchievementsSorting
              onSortByChanged={handleSortByChange}
              sortAscending={sort.ascending}
              sortBy={sort.property}
            />
            <UserUnLockedAchievementsFilteringName
              filterName={filters['achievement.name'].value as string}
              onFilterNameChange={handleFilterNameChange}
            />
            <UserUnLockedAchievementsFilteringCriterias
              filterCriterias={filters['achievement.criteria'].value as string[]}
              onFilterCriteriasChange={handleFilterCriteriasChange}
            />
          </div>

          <div className="mt-auto ml-auto">
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        </SheetContent>
      </Sheet>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredData.map((userAchievement) => {
          return (
            <UnLockedAchievementCard
              key={`user-achievement-${userAchievement.achievementId}`}
              userAchievement={userAchievement}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserUnLockedAchievementsFeed;
