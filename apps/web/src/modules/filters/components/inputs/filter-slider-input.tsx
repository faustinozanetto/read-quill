import React from 'react';
import { Slider } from '@read-quill/design-system';
import type { UseFilterActionsReturn } from '@modules/filters/hooks/use-filter-actions';
import FilterSection from '@modules/filters/components/filter-section';

/**
 * Props for the FilterSliderInput component.
 */
interface FilterSliderInputProps {
  /** The current value of the slider. */
  value: number;
  /** The title of the filter section. */
  title: string;
  /** Function called when the slider value changes. */
  onFilterChange: (value: number) => void;
  /** Function to reset the filter to its initial state. */
  onResetFilter: UseFilterActionsReturn<unknown>['resetFilter'];
}

const FilterSliderInput: React.FC<FilterSliderInputProps> = (props) => {
  const { value, title, onFilterChange, onResetFilter } = props;

  const handleChange = (newValue: number[]): void => {
    onFilterChange(newValue[0]);
  };

  return (
    <FilterSection onResetFilter={onResetFilter} title={title}>
      <div className="flex gap-2 justify-between items-center">
        <Slider onValueChange={handleChange} value={[value]} />
        <span className="text-sm font-medium block">{value}</span>
      </div>
    </FilterSection>
  );
};

export default FilterSliderInput;
