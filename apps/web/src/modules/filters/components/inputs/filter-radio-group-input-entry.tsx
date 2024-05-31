import { Label, RadioGroupItem } from '@read-quill/design-system';
import React from 'react';

interface FilterRadioGroupInputEntryProps {
  value: string;
  children: React.ReactNode;
}

const FilterRadioGroupInputEntry: React.FC<FilterRadioGroupInputEntryProps> = (props) => {
  const { value, children } = props;

  return (
    <div className="flex items-center space-x-3 space-y-0">
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value} className="font-normal">
        {children}
      </Label>
    </div>
  );
};

export default FilterRadioGroupInputEntry;
