import React from 'react';
import { Input, SearchIcon } from '@read-quill/design-system';
import AchievementsFilterSection from './achievements-filter-section';

interface AchievementsFilteringNameProps {
  filterName: string;
  onFilterNameChange: (value: string) => void;
}

const AchievementsFilteringName: React.FC<AchievementsFilteringNameProps> = (props) => {
  const { filterName, onFilterNameChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onFilterNameChange(event.target.value);
  };

  return (
    <AchievementsFilterSection title="Name">
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
    </AchievementsFilterSection>
  );
};

export default AchievementsFilteringName;