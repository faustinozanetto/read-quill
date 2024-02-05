import React from 'react';
import type { Book } from '@read-quill/database';
import { useFilterActions } from '@modules/common/hooks/use-filter-actions';
import UserBooksFeedFilteringLanguage from './user-book-feed-filtering-language';
import UserBooksFeedFilteringName from './user-book-feed-filtering-name';

const UserBooksFeedFiltering: React.FC = () => {
  const { updateFilterValue } = useFilterActions<Book>();

  const handleFilterNameChange = (value: string): void => {
    updateFilterValue('name', value);
  };

  const handleFilterLanguageChange = (value: string): void => {
    updateFilterValue('language', value);
  };

  return (
    <div className="grid gap-4 rounded-lg border shadow p-4 md:grid-cols-2">
      <UserBooksFeedFilteringLanguage onValueChange={handleFilterLanguageChange} />
      <UserBooksFeedFilteringName onValueChange={handleFilterNameChange} />
    </div>
  );
};

export default UserBooksFeedFiltering;
