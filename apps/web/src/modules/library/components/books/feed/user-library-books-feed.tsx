import React, { useState } from 'react';
import { compareAsc } from 'date-fns';
import {
  useFilterData,
  type UseFilterFilteringFunctions,
  type UseFilterSortingFunctions,
} from '@modules/filters/hooks/use-filter-data';
import FiltersShell from '@modules/filters/components/filters-shell';
import type { PaginationControlsProps } from '@modules/common/components/pagination/pagination-controls';
import PaginationControls from '@modules/common/components/pagination/pagination-controls';
import UserBooksFiltering from './user-library-books-feed-filtering';
import { LayoutListIcon, Skeleton } from '@read-quill/design-system';
import { ToggleGroup } from '@read-quill/design-system';
import { ToggleGroupItem } from '@read-quill/design-system';
import { LayoutGridIcon } from '@read-quill/design-system';
import { BookWithDetails } from '@modules/books/types/book.types';
import BooksFeed from '@modules/books/components/feed/books-feed';

interface UserLibraryBooksFeedProps extends PaginationControlsProps {
  books: BookWithDetails[];
  children: React.ReactNode;
}

const UserLibraryBooksFeed: React.FC<UserLibraryBooksFeedProps> = (props) => {
  const { books, page, pageCount, getCanNextPage, getCanPreviousPage, nextPage, previousPage, setPageIndex, children } =
    props;

  const [cardVariant, setCardVariant] = useState<'vertical' | 'landscape'>('vertical');

  const filterFunctions: UseFilterFilteringFunctions<BookWithDetails> = {
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

  const sortFunctions: UseFilterSortingFunctions<BookWithDetails> = {
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

  const { filteredData, filters, sort, noResults } = useFilterData<BookWithDetails>({
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
          {books.length ? (
            <span className="font-medium">Showing {filteredData.length} Books</span>
          ) : (
            <Skeleton className="h-5 w-36" />
          )}
          <ToggleGroup
            type="single"
            variant="outline"
            value={cardVariant}
            className="ml-auto"
            onValueChange={(value: 'vertical' | 'landscape') => {
              if (value) setCardVariant(value);
            }}
          >
            <ToggleGroupItem value="vertical" title="Layout Grid">
              <LayoutGridIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="landscape" title="Layout List">
              <LayoutListIcon />
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
            {books.length > 0 && (
              <>
                <BooksFeed className="flex-1" books={filteredData} cardVariant={cardVariant} />
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
            {children}
          </>
        )}
      </div>
    </FiltersShell>
  );
};

export default UserLibraryBooksFeed;
