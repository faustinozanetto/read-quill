import React from 'react';
import type { Book } from '@read-quill/database';
import { compareAsc } from 'date-fns';
import {
  useFilterData,
  type UseFilterFilteringFunctions,
  type UseFilterSortingFunctions,
} from '@modules/common/hooks/use-filter-data';
import BooksFeed from '../../feed/books-feed';
import UserBooksFeedFiltering from './filtering/user-books-feed-filtering';

interface UserBooksFeedProps {
  books: Book[];
}

const UserBooksFeed: React.FC<UserBooksFeedProps> = (props) => {
  const { books } = props;

  const filterFunctions: UseFilterFilteringFunctions<Book> = {
    name: (item, value) => item.name.toLowerCase().includes((value as string).toLowerCase()),
    language: (item, value) => item.language.toLowerCase().includes((value as string).toLowerCase()),
  };

  const sortFunctions: UseFilterSortingFunctions<Book> = {
    name: (a, b) => a.name.localeCompare(b.name),
    createdAt: (a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt) : new Date();
      const bDate = b.createdAt ? new Date(b.createdAt) : new Date();

      return compareAsc(aDate, bDate);
    },
  };

  const { filteredData } = useFilterData<Book>({
    data: books,
    filterFunctions,
    sortFunctions,
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <UserBooksFeedFiltering />
      <BooksFeed books={filteredData} />
    </div>
  );
};

export default UserBooksFeed;
