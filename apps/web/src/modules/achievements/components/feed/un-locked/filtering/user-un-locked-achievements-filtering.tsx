import React from 'react';
import type { UserAchievementWithAchievement } from '@modules/achievements/types/achievements.types';
import type { NestedKeyOf, UseFilterReturn } from '@modules/common/hooks/use-filter';
import { Button } from '@read-quill/design-system';
import UserUnLockedAchievementsFilteringCriterias from './user-un-locked-achievements-filtering-criterias';
import UserUnLockedAchievementsFilteringName from './user-un-locked-achievements-filtering-name';
import UserUnLockedAchievementsSorting from './user-un-locked-achievements-sorting';
import UserUnLockedAchievementsFilteringUnlockedBefore from './user-un-locked-achievements-filtering-unlocked-before';
import { ResetIcon } from '@read-quill/design-system/src/components/icons';

interface UserUnLockedAchievementsFilteringProps {
  /**
   * Callback function when filter name changes.
   * @param value - Name value.
   * @returns Void.
   */
  handleFilterNameChange: (value: string) => void;
  /**
   * Callback function when filter criterias changes.
   * @param value - Criterias value.
   * @returns Void.
   */
  handleFilterCriteriasChange: (value: string[]) => void;
  /**
   * Callback function when sort by changes.
   * @param value - Sort by property.
   * @param ascending - Sort asc or desc.
   * @returns Void
   */
  handleSortByChange: (value: NestedKeyOf<UserAchievementWithAchievement>, ascending: boolean) => void;
  /**
   * Callback function when filter unlocked before changes.
   * @param value - Unlocked before value.
   * @returns Void.
   */
  handleFilterUnlockedBeforeChange: (value: string) => void;
  /**
   * Filter sort data.
   */
  sort: UseFilterReturn<UserAchievementWithAchievement>['sort'];
  /**
   * Filter filters data.
   */
  filters: UseFilterReturn<UserAchievementWithAchievement>['filters'];
  /**
   * Function for reseting the filters and sort state.
   */
  resetFilters: UseFilterReturn<UserAchievementWithAchievement>['resetFilters'];
}

const UserUnLockedAchievementsFiltering: React.FC<UserUnLockedAchievementsFilteringProps> = (props) => {
  const {
    handleFilterNameChange,
    handleFilterCriteriasChange,
    handleSortByChange,
    handleFilterUnlockedBeforeChange,
    resetFilters,
    sort,
    filters,
  } = props;

  return (
    <div className="flex flex-col justify-between h-full mb-[64px]">
      <div className="flex flex-col gap-2">
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
        <UserUnLockedAchievementsFilteringUnlockedBefore
          filterUnlockedBefore={filters.unlockedAt.value as string}
          onFilterUnlockedBeforeChange={handleFilterUnlockedBeforeChange}
        />
      </div>
      <Button aria-label="Reset Filters" className="ml-auto" onClick={resetFilters} variant="destructive" size="sm">
        <ResetIcon className="mr-2" />
        Reset Filters
      </Button>
    </div>
  );
};

export default UserUnLockedAchievementsFiltering;
