import React from 'react';
import type { Book } from '@read-quill/database';
import { compareAsc } from 'date-fns';
import {
  useFilterData,
  type UseFilterFilteringFunctions,
  type UseFilterSortingFunctions,
} from '@modules/filters/hooks/use-filter-data';
import FiltersShell from '@modules/filters/components/filters-shell';
import type { PaginationControlsProps } from '@modules/common/components/pagination/pagination-controls';
import PaginationControls from '@modules/common/components/pagination/pagination-controls';
import BooksFeed from '../../feed/books-feed';
import UserBooksFiltering from './user-books-feed-filtering';

interface UserBooksFeedProps extends PaginationControlsProps {
  books: Book[];
}

const UserBooksFeed: React.FC<UserBooksFeedProps> = (props) => {
  const { books, page, pageCount, getCanNextPage, getCanPreviousPage, nextPage, previousPage, setPageIndex } = props;

  const filterFunctions: UseFilterFilteringFunctions<Book> = {
    name: (item, value) => item.name.toLowerCase().includes((value as string).toLowerCase()),
    language: (item, value) => item.language.toLowerCase().includes((value as string).toLowerCase()),
    author: (item, value) => item.author.toLowerCase().includes((value as string).toLowerCase()),
    isFavourite: (item, value) => {
      switch (value) {
        case 'yes':
          return item.isFavourite;
        case 'no':
          return !item.isFavourite;
        default:
          return true; // Return true for 'All' option
      }
    },
  };

  const sortFunctions: UseFilterSortingFunctions<Book> = {
    name: (a, b) => a.name.localeCompare(b.name),
    language: (a, b) => a.language.localeCompare(b.language),
    author: (a, b) => a.author.localeCompare(b.author),
    pageCount: (a, b) => (a.pageCount >= b.pageCount ? 1 : -1),
    startedAt: (a, b) => {
      const aDate = a.startedAt ? new Date(a.startedAt) : new Date();
      const bDate = b.startedAt ? new Date(b.startedAt) : new Date();

      return compareAsc(aDate, bDate);
    },
    finishedAt: (a, b) => {
      const aDate = a.finishedAt ? new Date(a.finishedAt) : new Date();
      const bDate = b.finishedAt ? new Date(b.finishedAt) : new Date();

      return compareAsc(aDate, bDate);
    },
  };

  const { filteredData, filters, sort } = useFilterData<Book>({
    data: books,
    filterFunctions,
    sortFunctions,
  });

  return (
    <FiltersShell
      onRenderFilters={() => {
        return <UserBooksFiltering filters={filters} sort={sort} />;
      }}
    >
      <div className="p-4 grow space-y-4">
        <BooksFeed books={filteredData} />
        <PaginationControls
          getCanNextPage={getCanNextPage}
          getCanPreviousPage={getCanPreviousPage}
          nextPage={nextPage}
          page={page}
          pageCount={pageCount}
          previousPage={previousPage}
          setPageIndex={setPageIndex}
        />
      </div>
    </FiltersShell>
  );
};

export default UserBooksFeed;
