import React from 'react';
import { RadioGroup } from '@read-quill/design-system';
import type { UseFilterActionsReturn } from '@modules/filters/hooks/use-filter-actions';
import FilterSection from '@modules/filters/components/filter-section';

/**
 * Props for the FilterRadioGroupInput component.
 */
interface FilterRadioGroupInputProps {
  /** The currently selected value in the radio group. */
  value: string;
  /** The title of the filter section. */
  title: string;
  /** Function called when the selected value in the radio group changes. */
  onFilterChange: (value: string) => void;
  defaultValue?: string;
  /** Function to reset the filter to its initial state. */
  onResetFilter: UseFilterActionsReturn<unknown>['resetFilter'];
  /** Children elements representing radio options in the group. */
  children: React.ReactNode;
}

const FilterRadioGroupInput: React.FC<FilterRadioGroupInputProps> = (props) => {
  const { value, title, onFilterChange, defaultValue, onResetFilter, children } = props;

  return (
    <FilterSection onResetFilter={onResetFilter} title={title}>
      <RadioGroup
        className="flex flex-col space-y-1"
        onValueChange={onFilterChange}
        defaultValue={defaultValue}
        value={value}
      >
        {children}
      </RadioGroup>
    </FilterSection>
  );
};

export default FilterRadioGroupInput;
