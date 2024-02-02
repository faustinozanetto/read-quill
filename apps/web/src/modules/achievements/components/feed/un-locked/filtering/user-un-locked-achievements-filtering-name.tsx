import React from 'react';
import { Input, SearchIcon } from '@read-quill/design-system';
import UserUnLockedAchievementsFilterSection from './user-un-locked-achievements-filter-section';

interface UserUnLockedAchievementsFilteringNameProps {
  filterName: string;
  onFilterNameChange: (value: string) => void;
}

const UserUnLockedAchievementsFilteringName: React.FC<UserUnLockedAchievementsFilteringNameProps> = (props) => {
  const { filterName, onFilterNameChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onFilterNameChange(event.target.value);
  };

  return (
    <UserUnLockedAchievementsFilterSection title="Name">
      <div className="relative">
        <SearchIcon className="absolute top-2.5 left-2.5 opacity-80" size="sm" />
        <Input
          className="pl-8"
          id="filter-name"
          onChange={handleChange}
          placeholder="Novice Reader"
          value={filterName}
        />
      </div>
    </UserUnLockedAchievementsFilterSection>
  );
};

export default UserUnLockedAchievementsFilteringName;
