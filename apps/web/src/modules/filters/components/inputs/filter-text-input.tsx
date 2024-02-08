import React from 'react';
import { Input, SearchIcon } from '@read-quill/design-system';
import type { UseFilterActionsReturn } from '@modules/filters/hooks/use-filter-actions';
import FilterSection from '@modules/filters/components/filter-section';

/**
 * Props for the FilterTextInput component.
 */
interface FilterTextInputProps {
  /** The currently entered value in the input. */
  value: string;
  /** The title of the filter section. */
  title: string;
  /** Placeholder text for the input field. */
  placeholder: string;
  /** Function called when the input value changes. */
  onFilterChange: (value: string) => void;
  /** Function to reset the filter to its initial state. */
  onResetFilter: UseFilterActionsReturn<unknown>['resetFilter'];
}

const FilterTextInput: React.FC<FilterTextInputProps> = (props) => {
  const { value, title, onFilterChange, onResetFilter, placeholder } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onFilterChange(event.target.value);
  };

  return (
    <FilterSection onResetFilter={onResetFilter} title={title}>
      <div className="relative">
        <SearchIcon className="absolute top-2.5 left-2.5 opacity-80" size="sm" />
        <Input className="pl-8" onChange={handleChange} placeholder={placeholder} value={value} />
      </div>
    </FilterSection>
  );
};

export default FilterTextInput;
