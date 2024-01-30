import React from 'react';
import { Label, Input, SearchIcon } from '@read-quill/design-system';

interface UserBooksFeedFilteringNameProps {
  onValueChange: (value: string) => void;
}

const UserBooksFeedFilteringName: React.FC<UserBooksFeedFilteringNameProps> = (props) => {
  const { onValueChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onValueChange(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="filter-name">Name</Label>
      <div className="relative">
        <SearchIcon className="absolute top-2.5 left-2.5 opacity-80" size="sm" />
        <Input className="pl-8" id="filter-name" onChange={handleChange} placeholder="Treasure Island" />
      </div>
    </div>
  );
};

export default UserBooksFeedFilteringName;
