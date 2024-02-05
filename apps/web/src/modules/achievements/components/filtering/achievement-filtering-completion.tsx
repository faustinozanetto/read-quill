import React from 'react';
import { Slider } from '@read-quill/design-system';
import type { UseFilterActionsReturn } from '@modules/common/hooks/use-filter-actions';
import AchievementsFilterSection from './achievements-filter-section';

interface AchievementsFilteringCompletionProps {
  filterCompletion: number;
  onFilterCompletionChange: (value: number) => void;
  onResetFilter: UseFilterActionsReturn<unknown>['resetFilter'];
}

const AchievementsFilteringCompletion: React.FC<AchievementsFilteringCompletionProps> = (props) => {
  const { filterCompletion, onFilterCompletionChange, onResetFilter } = props;

  const handleChange = (value: number[]): void => {
    onFilterCompletionChange(value[0]);
  };

  return (
    <AchievementsFilterSection onResetFilter={onResetFilter} title="Completion %">
      <div className="flex gap-2 justify-between items-center">
        <Slider onValueChange={handleChange} value={[filterCompletion]} />
        <span className="text-sm font-medium block">{filterCompletion}</span>
      </div>
    </AchievementsFilterSection>
  );
};

export default AchievementsFilteringCompletion;
