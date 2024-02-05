import React from 'react';
import { SelectItem } from '@read-quill/design-system';
import type { AchievementWithProgress } from '@modules/achievements/types/achievements.types';
import type { NestedKeyOf, UseFilterReturn } from '@modules/common/hooks/use-filter-data';
import { LOCKED_ACHIEVEMENT_SORT_BY } from '@modules/achievements/lib/achievement.constants';
import { useFilterActions } from '@modules/common/hooks/use-filter-actions';
import AchievementsFilteringCriterias from '../../filtering/achievements-filtering-criterias';
import AchievementsFilteringName from '../../filtering/achievements-filtering-name';
import AchievementsSorting from '../../filtering/achievements-sorting';
import AchievementsFiltering from '../../filtering/achievements-filtering';
import AchievementsFilteringCompletion from '../../filtering/achievement-filtering-completion';

interface UserLockedAchievementsFilteringProps {
  /**
   * Filter sort data.
   */
  sort: UseFilterReturn<AchievementWithProgress>['sort'];
  /**
   * Filter filters data.
   */
  filters: UseFilterReturn<AchievementWithProgress>['filters'];
}

const UserLockedAchievementsFiltering: React.FC<UserLockedAchievementsFilteringProps> = (props) => {
  const { sort, filters } = props;

  const { updateFilterValue, updateSort, resetFilter, resetFilters, resetSort } =
    useFilterActions<AchievementWithProgress>();

  const handleFilterNameChange = (value: string): void => {
    updateFilterValue('name', value);
  };

  const handleFilterCriteriasChange = (value: string[]): void => {
    updateFilterValue('criteria', value);
  };

  const handleSortByChange = (value: NestedKeyOf<AchievementWithProgress>, ascending: boolean): void => {
    updateSort({ property: value, ascending });
  };

  const handleFilterCompletionChange = (value: number): void => {
    updateFilterValue('completionPercentage', value);
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
          {Object.entries(LOCKED_ACHIEVEMENT_SORT_BY).map((achievementSortBy) => {
            return (
              <SelectItem key={achievementSortBy[0]} value={achievementSortBy[0]}>
                {achievementSortBy[1]}
              </SelectItem>
            );
          })}
        </AchievementsSorting>
        <AchievementsFilteringName
          filterName={filters.name.value as string}
          onFilterNameChange={handleFilterNameChange}
          onResetFilter={() => { resetFilter('name'); }}
        />
        <AchievementsFilteringCriterias
          filterCriterias={filters.criteria.value as string[]}
          onFilterCriteriasChange={handleFilterCriteriasChange}
          onResetFilter={() => { resetFilter('criteria'); }}
        />
        <AchievementsFilteringCompletion
          filterCompletion={filters.completionPercentage.value as number}
          onFilterCompletionChange={handleFilterCompletionChange}
          onResetFilter={() => { resetFilter('completionPercentage'); }}
        />
      </div>
    </AchievementsFiltering>
  );
};

export default UserLockedAchievementsFiltering;
