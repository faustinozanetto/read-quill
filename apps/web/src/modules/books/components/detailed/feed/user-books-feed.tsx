import React, { useState } from 'react';
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
import { BookCardStyleProps } from '../../cards/book-card';
import { Button } from '@read-quill/design-system';
import { LayoutListIcon } from '@read-quill/design-system';
import { ToggleGroup } from '@read-quill/design-system';
import { ToggleGroupItem } from '@read-quill/design-system';
import { LayoutGridIcon } from '@read-quill/design-system';

interface UserBooksFeedProps extends PaginationControlsProps {
  books: Book[];
}

const UserBooksFeed: React.FC<UserBooksFeedProps> = (props) => {
  const { books, page, pageCount, getCanNextPage, getCanPreviousPage, nextPage, previousPage, setPageIndex } = props;

  const [cardVariant, setCardVariant] = useState<BookCardStyleProps['variant']>('vertical');

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

  const { filteredData, filters, sort, noResults } = useFilterData<Book>({
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
      <div className="p-4 grow flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Showing {filteredData.length} Books</span>
          <ToggleGroup
            type="single"
            variant="outline"
            value={cardVariant}
            onValueChange={(value: BookCardStyleProps['variant']) => {
              if (value) setCardVariant(value);
            }}
          >
            <ToggleGroupItem value="vertical">
              <LayoutListIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="landscape">
              <LayoutGridIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        {noResults ? (
          <p className="my-auto text-center">
            It looks like there are <strong>no books</strong> that match your current filters, try adjusting your
            filters!
          </p>
        ) : (
          <>
            <BooksFeed books={filteredData} cardVariant={cardVariant} />
            <PaginationControls
              getCanNextPage={getCanNextPage}
              getCanPreviousPage={getCanPreviousPage}
              nextPage={nextPage}
              page={page}
              pageCount={pageCount}
              previousPage={previousPage}
              setPageIndex={setPageIndex}
            />
          </>
        )}
      </div>
    </FiltersShell>
  );
};

export default UserBooksFeed;
