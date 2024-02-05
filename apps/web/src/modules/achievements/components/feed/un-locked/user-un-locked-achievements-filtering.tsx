import React from 'react';
import { SelectItem } from '@read-quill/design-system';
import type { UserAchievementWithAchievement } from '@modules/achievements/types/achievements.types';
import type { NestedKeyOf, UseFilterReturn } from '@modules/common/hooks/use-filter-data';
import { UN_LOCKED_ACHIEVEMENT_SORT_BY } from '@modules/achievements/lib/achievement.constants';
import { useFilterActions } from '@modules/common/hooks/use-filter-actions';
import AchievementsFilteringCriterias from '../../filtering/achievements-filtering-criterias';
import AchievementsFilteringName from '../../filtering/achievements-filtering-name';
import AchievementsSorting from '../../filtering/achievements-sorting';
import AchievementsFilteringUnlockedBefore from '../../filtering/achievements-filtering-unlocked-before';
import AchievementsFiltering from '../../filtering/achievements-filtering';

interface UserUnLockedAchievementsFilteringProps {
  /**
   * Filter sort data.
   */
  sort: UseFilterReturn<UserAchievementWithAchievement>['sort'];
  /**
   * Filter filters data.
   */
  filters: UseFilterReturn<UserAchievementWithAchievement>['filters'];
}

const UserUnLockedAchievementsFiltering: React.FC<UserUnLockedAchievementsFilteringProps> = (props) => {
  const { sort, filters } = props;

  const { updateFilterValue, updateSort, resetFilter, resetFilters, resetSort } =
    useFilterActions<UserAchievementWithAchievement>();

  const handleFilterNameChange = (value: string): void => {
    updateFilterValue('achievement.name', value);
  };

  const handleFilterCriteriasChange = (value: string[]): void => {
    updateFilterValue('achievement.criteria', value);
  };

  const handleUnlockedBeforeChange = (value: string): void => {
    updateFilterValue('unlockedAt', value);
  };

  const handleSortByChange = (value: NestedKeyOf<UserAchievementWithAchievement>, ascending: boolean): void => {
    updateSort({ property: value, ascending });
  };

  return (
    <AchievementsFiltering onResetFilters={resetFilters}>
      <div className="flex flex-col gap-2">
        <AchievementsSorting
          onResetFilter={resetSort}
          onSortByChanged={handleSortByChange}
          sortAscending={sort.ascending}
          sortBy={sort.property}
        >
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
          onResetFilter={() => { resetFilter('achievement.name'); }}
        />
        <AchievementsFilteringCriterias
          filterCriterias={filters['achievement.criteria'].value as string[]}
          onFilterCriteriasChange={handleFilterCriteriasChange}
          onResetFilter={() => { resetFilter('achievement.criteria'); }}
        />
        <AchievementsFilteringUnlockedBefore
          filterUnlockedBefore={filters.unlockedAt.value as string}
          onFilterUnlockedBeforeChange={handleUnlockedBeforeChange}
          onResetFilter={() => { resetFilter('unlockedAt'); }}
        />
      </div>
    </AchievementsFiltering>
  );
};

export default UserUnLockedAchievementsFiltering;
