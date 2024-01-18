import React from 'react';
import type { Book } from '@read-quill/database';
import type { Filter, Sort } from '@modules/common/hooks/use-filter';
import useFilter from '@modules/common/hooks/use-filter';
import BooksFeed from '../../feed/books-feed';
import UserBooksFeedFiltering from './user-books-feed-filtering';

interface UserBooksFeedProps {
  books: Book[];
}

const UserBooksFeed: React.FC<UserBooksFeedProps> = (props) => {
  const { books } = props;

  const initialFilters: Filter<Book>[] = [
    { property: 'language', value: '', enabled: false },
    { property: 'name', value: '', enabled: false },
  ];

  const initialSort: Sort<Book> = {
    property: 'name',
    ascending: false,
  };

  const { filteredData, updateFilter } = useFilter<Book>(books, initialFilters, initialSort);

  const handleFilterLanguageChanged = (value: string): void => {
    updateFilter({ property: 'language', value, enabled: value !== 'All' });
  };

  const handleFilterNameChanged = (value: string): void => {
    updateFilter({ property: 'name', value, enabled: value !== '' });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <UserBooksFeedFiltering
        onFilterLanguageChanged={handleFilterLanguageChanged}
        onFilterNameChanged={handleFilterNameChanged}
      />
      <BooksFeed books={filteredData} />
    </div>
  );
};

export default UserBooksFeed;
