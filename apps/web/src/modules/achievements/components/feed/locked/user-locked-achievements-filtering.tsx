import React from 'react';
import { SelectItem, ToggleGroupItem } from '@read-quill/design-system';
import type { AchievementWithProgress } from '@modules/achievements/types/achievements.types';
import type { UseFilterReturn } from '@modules/filters/hooks/use-filter-data';
import {
  ACHIEVEMENT_DISPLAY_CRITERIAS,
  LOCKED_ACHIEVEMENT_SORT_BY,
} from '@modules/achievements/lib/achievement.constants';
import { useFilterActions } from '@modules/filters/hooks/use-filter-actions';
import FilterSliderInput from '@modules/filters/components/inputs/filter-slider-input';
import FilterTextInput from '@modules/filters/components/inputs/filter-text-input';
import FilterToggleGroupInput from '@modules/filters/components/inputs/filter-toggle-group-input';
import AchievementsFiltering from '../../filtering/achievements-filtering';

/**
 * Props for the UserLockedAchievementsFiltering component.
 */
interface UserLockedAchievementsFilteringProps {
  /**
   * Sort criteria for filtering locked achievements.
   */
  sort: UseFilterReturn<AchievementWithProgress>['sort'];
  /**
   * Filter criteria for filtering locked achievements.
   */
  filters: UseFilterReturn<AchievementWithProgress>['filters'];
}

const UserLockedAchievementsFiltering: React.FC<UserLockedAchievementsFilteringProps> = (props) => {
  const { sort, filters } = props;

  const { updateFilterValue, resetFilter } = useFilterActions<AchievementWithProgress>();

  const handleFilterCompletionChange = (value: number): void => {
    updateFilterValue('completionPercentage', value);
  };

  const handleFilterNameChange = (value: string): void => {
    updateFilterValue('name', value);
  };

  const handleFilterCriteriasChange = (value: string[]): void => {
    updateFilterValue('criteria', value);
  };

  return (
    <AchievementsFiltering
      onRenderSortBy={() => {
        return Object.entries(LOCKED_ACHIEVEMENT_SORT_BY).map((achievementSortBy) => {
          return (
            <SelectItem key={achievementSortBy[0]} value={achievementSortBy[0]}>
              {achievementSortBy[1]}
            </SelectItem>
          );
        });
      }}
      sort={sort}
    >
      <FilterTextInput
        onFilterChange={handleFilterNameChange}
        onResetFilter={() => {
          resetFilter('name');
        }}
        placeholder="Novice Reader"
        title="Name"
        value={filters.name.value as string}
      />
      <FilterToggleGroupInput
        onFilterChange={handleFilterCriteriasChange}
        onResetFilter={() => {
          resetFilter('criteria');
        }}
        title="Criterias"
        value={filters.criteria.value as string[]}
      >
        {Object.entries(ACHIEVEMENT_DISPLAY_CRITERIAS).map((criteria) => {
          return (
            <ToggleGroupItem className="text-xs" key={criteria[0]} size="sm" value={criteria[0]}>
              {criteria[1]}
            </ToggleGroupItem>
          );
        })}
      </FilterToggleGroupInput>
      <FilterSliderInput
        onFilterChange={handleFilterCompletionChange}
        onResetFilter={() => {
          resetFilter('completionPercentage');
        }}
        title="Completion %"
        value={filters.completionPercentage.value as number}
      />
    </AchievementsFiltering>
  );
};

export default UserLockedAchievementsFiltering;
