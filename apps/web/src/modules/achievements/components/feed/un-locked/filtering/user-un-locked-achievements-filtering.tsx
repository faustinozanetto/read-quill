import React from 'react';
import type { UserAchievementWithAchievement } from '@modules/achievements/types/achievements.types';
import type { NestedKeyOf, UseFilterReturn } from '@modules/common/hooks/use-filter';
import { Button } from '@read-quill/design-system';
import UserUnLockedAchievementsFilteringCriterias from './user-un-locked-achievements-filtering-criterias';
import UserUnLockedAchievementsFilteringName from './user-un-locked-achievements-filtering-name';
import UserUnLockedAchievementsSorting from './user-un-locked-achievements-sorting';

interface UserUnLockedAchievementsFilteringProps {
  handleFilterNameChange: (value: string) => void;
  handleFilterCriteriasChange: (value: string[]) => void;
  handleSortByChange: (value: NestedKeyOf<UserAchievementWithAchievement>, ascending: boolean) => void;
  sort: UseFilterReturn<UserAchievementWithAchievement>['sort'];
  filters: UseFilterReturn<UserAchievementWithAchievement>['filters'];
  resetFilters: UseFilterReturn<UserAchievementWithAchievement>['resetFilters'];
}

const UserUnLockedAchievementsFiltering: React.FC<UserUnLockedAchievementsFilteringProps> = (props) => {
  const { handleFilterNameChange, handleFilterCriteriasChange, handleSortByChange, resetFilters, sort, filters } =
    props;

  return (
    <div className="flex flex-col h-full gap-2">
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

      <div className="mt-auto ml-auto">
        <Button onClick={resetFilters}>Reset Filters</Button>
      </div>
    </div>
  );
};

export default UserUnLockedAchievementsFiltering;
