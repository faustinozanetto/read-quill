import React from 'react';
import { Switch } from '@read-quill/design-system';
import type { UseFilterActionsReturn } from '@modules/filters/hooks/use-filter-actions';
import FilterSection from '@modules/filters/components/filter-section';

/**
 * Props for the FilterSwitchInput component.
 */
interface FilterSwitchInputProps {
  /** The current state of the switch. */
  value: boolean;
  /** The title of the filter section. */
  title: string;
  /** Function called when the switch state changes. */
  onFilterChange: (value: boolean) => void;
  /** Function to reset the filter to its initial state. */
  onResetFilter: UseFilterActionsReturn<unknown>['resetFilter'];
}

const FilterSwitchInput: React.FC<FilterSwitchInputProps> = (props) => {
  const { value, title, onFilterChange, onResetFilter } = props;

  return (
    <FilterSection onResetFilter={onResetFilter} title={title}>
      <Switch checked={value} onCheckedChange={onFilterChange} />
    </FilterSection>
  );
};

export default FilterSwitchInput;
