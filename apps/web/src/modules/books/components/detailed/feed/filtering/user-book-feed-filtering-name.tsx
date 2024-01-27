import React from 'react';
import { Label, Input } from '@read-quill/design-system';

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
      <Input id="filter-name" onChange={handleChange} placeholder="Treasure Island" />
    </div>
  );
};

export default UserBooksFeedFilteringName;
