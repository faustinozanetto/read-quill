import React from 'react';
import UserBooksFeedFilteringLanguage from './user-book-feed-filtering-language';
import UserBooksFeedFilteringName from './user-book-feed-filtering-name';

interface UserBooksFeedFilteringProps {
  onFilterLanguageChanged: (value: string) => void;
  onFilterNameChanged: (value: string) => void;
}

const UserBooksFeedFiltering: React.FC<UserBooksFeedFilteringProps> = (props) => {
  const { onFilterLanguageChanged, onFilterNameChanged } = props;

  return (
    <div className="grid gap-4 rounded-lg border shadow p-4 md:grid-cols-2">
      <UserBooksFeedFilteringLanguage onValueChange={onFilterLanguageChanged} />
      <UserBooksFeedFilteringName onValueChange={onFilterNameChanged} />
    </div>
  );
};

export default UserBooksFeedFiltering;
