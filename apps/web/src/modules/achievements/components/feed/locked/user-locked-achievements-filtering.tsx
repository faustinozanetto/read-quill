import React from 'react';
import type { AchievementWithProgress } from '@modules/achievements/types/achievements.types';
import type { NestedKeyOf, UseFilterReturn } from '@modules/common/hooks/use-filter';
import { SelectItem } from '@read-quill/design-system';
import { LOCKED_ACHIEVEMENT_SORT_BY } from '@modules/achievements/lib/achievement.constants';
import AchievementsFilteringCriterias from '../../filtering/achievements-filtering-criterias';
import AchievementsFilteringName from '../../filtering/achievements-filtering-name';
import AchievementsSorting from '../../filtering/achievements-sorting';
import AchievementsFiltering from '../../filtering/achievements-filtering';
import AchievementsFilteringCompletion from '../../filtering/achievement-filtering-completion';

interface UserLockedAchievementsFilteringProps {
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
   * Callback function when filter completion changes.
   * @param value - Completion value.
   * @returns Void.
   */
  handleFilterCompletionChange: (value: number) => void;
  /**
   * Callback function when sort by changes.
   * @param value - Sort by property.
   * @param ascending - Sort asc or desc.
   * @returns Void
   */
  handleSortByChange: (value: NestedKeyOf<AchievementWithProgress>, ascending: boolean) => void;
  /**
   * Filter sort data.
   */
  sort: UseFilterReturn<AchievementWithProgress>['sort'];
  /**
   * Filter filters data.
   */
  filters: UseFilterReturn<AchievementWithProgress>['filters'];
  /**
   * Function for reseting the filters and sort state.
   */
  resetFilters: UseFilterReturn<AchievementWithProgress>['resetFilters'];
}

const UserLockedAchievementsFiltering: React.FC<UserLockedAchievementsFilteringProps> = (props) => {
  const {
    handleFilterNameChange,
    handleFilterCriteriasChange,
    handleFilterCompletionChange,
    handleSortByChange,
    resetFilters,
    sort,
    filters,
  } = props;

  return (
    <AchievementsFiltering resetFilters={resetFilters}>
      <div className="flex flex-col gap-2">
        <AchievementsSorting onSortByChanged={handleSortByChange} sortAscending={sort.ascending} sortBy={sort.property}>
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
        />
        <AchievementsFilteringCriterias
          filterCriterias={filters.criteria.value as string[]}
          onFilterCriteriasChange={handleFilterCriteriasChange}
        />
        <AchievementsFilteringCompletion
          filterCompletion={filters.completionPercentage.value as number}
          onFilterCompletionChange={handleFilterCompletionChange}
        />
      </div>
    </AchievementsFiltering>
  );
};

export default UserLockedAchievementsFiltering;
