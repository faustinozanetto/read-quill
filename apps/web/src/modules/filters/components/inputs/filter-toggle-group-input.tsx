import React from 'react';
import { ToggleGroup } from '@read-quill/design-system';
import type { UseFilterActionsReturn } from '@modules/filters/hooks/use-filter-actions';
import FilterSection from '@modules/filters/components/filter-section';

interface FilterToggleGroupInputProps {
  /** The currently selected values. */
  value: string[];
  /** The title of the filter section. */
  title: string;
  /** Function called when the filter values change. */
  onFilterChange: (value: string[]) => void;
  /** Function to reset the filter to its initial state. */
  onResetFilter: UseFilterActionsReturn<unknown>['resetFilter'];
  /** Children elements representing the options in the toggle group. */
  children: React.ReactNode;
}

const FilterToggleGroupInput: React.FC<FilterToggleGroupInputProps> = (props) => {
  const { value, title, onFilterChange, onResetFilter, children, ...rest } = props;

  return (
    <FilterSection onResetFilter={onResetFilter} title={title}>
      <ToggleGroup className="flex-wrap" onValueChange={onFilterChange} type="multiple" value={value} {...rest}>
        {children}
      </ToggleGroup>
    </FilterSection>
  );
};

export default FilterToggleGroupInput;
