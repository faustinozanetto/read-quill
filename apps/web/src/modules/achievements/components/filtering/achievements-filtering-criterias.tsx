import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@read-quill/design-system';
import { ACHIEVEMENT_DISPLAY_CRITERIAS } from '@modules/achievements/lib/achievement.constants';
import type { UseFilterActionsReturn } from '@modules/common/hooks/use-filter-actions';
import FilterSection from '@modules/common/components/filter/filter-section';

interface AchievementsFilteringCriteriasProps {
  filterCriterias: string[];
  onFilterCriteriasChange: (value: string[]) => void;
  onResetFilter: UseFilterActionsReturn<unknown>['resetFilter'];
}

const AchievementsFilteringCriterias: React.FC<AchievementsFilteringCriteriasProps> = (props) => {
  const { filterCriterias, onFilterCriteriasChange, onResetFilter } = props;

  const handleChange = (value: string[]): void => {
    onFilterCriteriasChange(value);
  };

  return (
    <FilterSection onResetFilter={onResetFilter} title="Criterias">
      <ToggleGroup
        className="flex-wrap"
        onValueChange={handleChange}
        type="multiple"
        value={filterCriterias}
        variant="outline"
      >
        {Object.entries(ACHIEVEMENT_DISPLAY_CRITERIAS).map((criteria) => {
          return (
            <ToggleGroupItem className="text-xs" key={criteria[0]} size="sm" value={criteria[0]}>
              {criteria[1]}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </FilterSection>
  );
};

export default AchievementsFilteringCriterias;
