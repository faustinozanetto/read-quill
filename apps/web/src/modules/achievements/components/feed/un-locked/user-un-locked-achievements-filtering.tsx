import React from 'react';
import { SelectItem, ToggleGroupItem } from '@read-quill/design-system';
import type { AchievementWithUserAchievement } from '@modules/achievements/types/achievements.types';
import type { UseFilterReturn } from '@modules/filters/hooks/use-filter-data';
import {
  ACHIEVEMENT_DISPLAY_CRITERIAS,
  UN_LOCKED_ACHIEVEMENT_SORT_BY,
} from '@modules/achievements/lib/achievement.constants';
import { useFilterActions } from '@modules/filters/hooks/use-filter-actions';
import FilterTextInput from '@modules/filters/components/inputs/filter-text-input';
import FilterToggleGroupInput from '@modules/filters/components/inputs/filter-toggle-group-input';
import AchievementsFilteringUnlockedBefore from '../../filtering/achievements-filtering-unlocked-before';
import AchievementsFiltering from '../../filtering/achievements-filtering';

/**
 * Props for the UserUnLockedAchievementsFiltering component.
 */
interface UserUnLockedAchievementsFilteringProps {
  /**
   * Sort criteria for filtering unlocked achievements.
   */
  sort: UseFilterReturn<AchievementWithUserAchievement>['sort'];
  /**
   * Filter criteria for filtering unlocked achievements.
   */
  filters: UseFilterReturn<AchievementWithUserAchievement>['filters'];
}

const UserUnLockedAchievementsFiltering: React.FC<UserUnLockedAchievementsFilteringProps> = (props) => {
  const { sort, filters } = props;

  const { updateFilterValue, resetFilter } = useFilterActions<AchievementWithUserAchievement>();

  const handleUnlockedBeforeChange = (value: string): void => {
    updateFilterValue('unlockedAt', value);
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
        return Object.entries(UN_LOCKED_ACHIEVEMENT_SORT_BY).map((achievementSortBy) => {
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
      <AchievementsFilteringUnlockedBefore
        filterUnlockedBefore={filters.unlockedAt.value as string}
        onFilterUnlockedBeforeChange={handleUnlockedBeforeChange}
        onResetFilter={() => {
          resetFilter('unlockedAt');
        }}
      />
    </AchievementsFiltering>
  );
};

export default UserUnLockedAchievementsFiltering;
