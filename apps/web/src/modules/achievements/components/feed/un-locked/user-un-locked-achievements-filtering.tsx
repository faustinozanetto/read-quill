import React from 'react';
import type { UserAchievementWithAchievement } from '@modules/achievements/types/achievements.types';
import type { NestedKeyOf, UseFilterReturn } from '@modules/common/hooks/use-filter';
import AchievementsFilteringCriterias from '../../filtering/achievements-filtering-criterias';
import AchievementsFilteringName from '../../filtering/achievements-filtering-name';
import AchievementsSorting from '../../filtering/achievements-sorting';
import AchievementsFilteringUnlockedBefore from '../../filtering/achievements-filtering-unlocked-before';
import AchievementsFiltering from '../../filtering/achievements-filtering';
import { SelectItem } from '@read-quill/design-system';
import { UN_LOCKED_ACHIEVEMENT_SORT_BY } from '@modules/achievements/lib/achievement.constants';

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
    <AchievementsFiltering resetFilters={resetFilters}>
      <div className="flex flex-col gap-2">
        <AchievementsSorting onSortByChanged={handleSortByChange} sortAscending={sort.ascending} sortBy={sort.property}>
          {Object.entries(UN_LOCKED_ACHIEVEMENT_SORT_BY).map((achievementSortBy) => {
            return (
              <SelectItem key={achievementSortBy[0]} value={achievementSortBy[0]}>
                {achievementSortBy[1]}
              </SelectItem>
            );
          })}
        </AchievementsSorting>
        <AchievementsFilteringName
          filterName={filters['achievement.name'].value as string}
          onFilterNameChange={handleFilterNameChange}
        />
        <AchievementsFilteringCriterias
          filterCriterias={filters['achievement.criteria'].value as string[]}
          onFilterCriteriasChange={handleFilterCriteriasChange}
        />
        <AchievementsFilteringUnlockedBefore
          filterUnlockedBefore={filters.unlockedAt.value as string}
          onFilterUnlockedBeforeChange={handleFilterUnlockedBeforeChange}
        />
      </div>
    </AchievementsFiltering>
  );
};

export default UserUnLockedAchievementsFiltering;
