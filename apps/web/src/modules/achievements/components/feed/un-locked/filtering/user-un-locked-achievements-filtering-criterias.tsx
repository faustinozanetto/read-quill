import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@read-quill/design-system';
import { ACHIEVEMENT_DISPLAY_CRITERIAS } from '@modules/achievements/lib/achievement.constants';
import UserUnLockedAchievementsFilterSection from './user-un-locked-achievements-filter-section';

interface UserUnLockedAchievementsFilteringCriteriasProps {
  filterCriterias: string[];
  onFilterCriteriasChange: (value: string[]) => void;
}

const UserUnLockedAchievementsFilteringCriterias: React.FC<UserUnLockedAchievementsFilteringCriteriasProps> = (
  props
) => {
  const { filterCriterias, onFilterCriteriasChange } = props;

  const handleChange = (value: string[]): void => {
    onFilterCriteriasChange(value);
  };

  return (
    <UserUnLockedAchievementsFilterSection title="Criterias">
      <ToggleGroup
        className="flex-wrap"
        onValueChange={handleChange}
        type="multiple"
        value={filterCriterias}
        variant="outline"
      >
        {Object.entries(ACHIEVEMENT_DISPLAY_CRITERIAS).map((criteria) => {
          return (
            <ToggleGroupItem
              className="data-[state=on]:bg-primary data-[state=on]:text-background text-xs"
              key={criteria[0]}
              size="sm"
              value={criteria[0]}
            >
              {criteria[1]}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </UserUnLockedAchievementsFilterSection>
  );
};

export default UserUnLockedAchievementsFilteringCriterias;
