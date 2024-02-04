import React from 'react';
import { Slider } from '@read-quill/design-system';
import AchievementsFilterSection from './achievements-filter-section';

interface AchievementsFilteringCompletionProps {
  filterCompletion: number;
  onFilterCompletionChange: (value: number) => void;
}

const AchievementsFilteringCompletion: React.FC<AchievementsFilteringCompletionProps> = (props) => {
  const { filterCompletion, onFilterCompletionChange } = props;

  const handleChange = (value: number[]): void => {
    onFilterCompletionChange(value[0]);
  };

  return (
    <AchievementsFilterSection title="Completion %">
      <div className="flex gap-2 justify-between items-center">
        <Slider onValueChange={handleChange} value={[filterCompletion]} />
        <span className="text-sm font-medium block">{filterCompletion}</span>
      </div>
    </AchievementsFilterSection>
  );
};

export default AchievementsFilteringCompletion;
