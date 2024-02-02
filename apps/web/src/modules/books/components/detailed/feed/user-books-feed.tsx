import React from 'react';
import type { Book } from '@read-quill/database';
import type {
  Filter,
  Sort,
  UseFilterFilteringFunctions,
  UseFilterSortingFunctions,
} from '@modules/common/hooks/use-filter';
import useFilter from '@modules/common/hooks/use-filter';
import { compareAsc } from 'date-fns';
import BooksFeed from '../../feed/books-feed';
import UserBooksFeedFiltering from './filtering/user-books-feed-filtering';

interface UserBooksFeedProps {
  books: Book[];
}

const UserBooksFeed: React.FC<UserBooksFeedProps> = (props) => {
  const { books } = props;

  const initialFilters: Filter<Book>[] = [
    { property: 'name', value: '', shouldEnable: (value) => value !== '' },
    { property: 'language', value: '', shouldEnable: (value) => value !== 'All' },
  ];

  const initialSort: Sort<Book> = { property: 'createdAt', ascending: false };

  const filteringFunctinons: UseFilterFilteringFunctions<Book> = {
    name: (item, value) => item.name.toLowerCase().includes((value as string).toLowerCase()),
    language: (item, value) => item.language.toLowerCase().includes((value as string).toLowerCase()),
  };

  const sortingFunctions: UseFilterSortingFunctions<Book> = {
    name: (a, b) => a.name.localeCompare(b.name),
    createdAt: (a, b, ascending) => {
      const aDate = a.createdAt ? new Date(a.createdAt) : new Date();
      const bDate = b.createdAt ? new Date(b.createdAt) : new Date();

      const order = ascending ? 1 : -1;
      return compareAsc(aDate, bDate) * order;
    },
  };

  const { filteredData, updateFilterValue } = useFilter<Book>(
    books,
    initialFilters,
    initialSort,
    filteringFunctinons,
    sortingFunctions
  );

  const handleFilterNameChange = (value: string): void => {
    updateFilterValue('name', value);
  };

  const handleFilterLanguageChange = (value: string): void => {
    updateFilterValue('language', value);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <UserBooksFeedFiltering
        onFilterLanguageChange={handleFilterLanguageChange}
        onFilterNameChange={handleFilterNameChange}
      />
      <BooksFeed books={filteredData} />
    </div>
  );
};

export default UserBooksFeed;
