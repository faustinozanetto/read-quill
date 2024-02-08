import React from 'react';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@read-quill/design-system';
import type { UseFilterActionsReturn } from '@modules/filters/hooks/use-filter-actions';
import FilterSection from '@modules/filters/components/filter-section';

/**
 * Props for the FilterSelectInput component.
 */
interface FilterSelectInputProps {
  /** The currently selected value in the select dropdown. */
  value: string;
  /** The title of the filter section. */
  title: string;
  /** Placeholder text for the select dropdown. */
  placeholder: string;
  /** Function called when the select value changes. */
  onFilterChange: (value: string) => void;
  /** Function to reset the filter to its initial state. */
  onResetFilter: UseFilterActionsReturn<unknown>['resetFilter'];
  /** Children elements to render as options in the select dropdown. */
  children: React.ReactNode;
}

const FilterSelectInput: React.FC<FilterSelectInputProps> = (props) => {
  const { value, title, onFilterChange, onResetFilter, children, placeholder } = props;

  return (
    <FilterSection onResetFilter={onResetFilter} title={title}>
      <Select onValueChange={onFilterChange} value={value}>
        <SelectTrigger className="grow">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </FilterSection>
  );
};

export default FilterSelectInput;
