import React from 'react';
import UserBooksFeedFilteringLanguage from './user-book-feed-filtering-language';
import UserBooksFeedFilteringName from './user-book-feed-filtering-name';

interface UserBooksFeedFilteringProps {
  onFilterLanguageChange: (value: string) => void;
  onFilterNameChange: (value: string) => void;
}

const UserBooksFeedFiltering: React.FC<UserBooksFeedFilteringProps> = (props) => {
  const { onFilterLanguageChange, onFilterNameChange } = props;

  return (
    <div className="grid gap-4 rounded-lg border shadow p-4 md:grid-cols-2">
      <UserBooksFeedFilteringLanguage onValueChange={onFilterLanguageChange} />
      <UserBooksFeedFilteringName onValueChange={onFilterNameChange} />
    </div>
  );
};

export default UserBooksFeedFiltering;
