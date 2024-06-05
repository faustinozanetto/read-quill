import React from 'react';
import type { DashboardBooksProgressGetResponse } from '@modules/api/types/dashboard-api.types';
import type { PaginationControlsProps } from '@modules/common/components/pagination/pagination-controls';
import PaginationControls from '@modules/common/components/pagination/pagination-controls';
import type { UseFilterFilteringFunctions, UseFilterSortingFunctions } from '@modules/filters/hooks/use-filter-data';
import { useFilterData } from '@modules/filters/hooks/use-filter-data';
import FiltersShell from '@modules/filters/components/filters-shell';
import DashboardBooksProgressCard from './dashboard-books-progress-card';
import DashboardBooksProgressFiltering from './filtering/dashboard-books-progress-filtering';
import { BookProgressEntry } from '@modules/dashboard/types/dashboard.types';

interface DashboardBooksProgressFeedProps extends PaginationControlsProps {
  booksProgress: BookProgressEntry[];
  children: React.ReactNode;
}

const DashboardBooksProgressFeed: React.FC<DashboardBooksProgressFeedProps> = (props) => {
  const {
    booksProgress,
    page,
    pageCount,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    previousPage,
    setPageIndex,
    children,
  } = props;

  const filterFunctions: UseFilterFilteringFunctions<BookProgressEntry> = {
    name: (item, value) => item.name.toLowerCase().includes((value as string).toLowerCase()),
    progress: (item, value) => (value as number) >= item.progress,
    completed: (item, value) => {
      switch (value) {
        case 'yes':
          return item.completed;
        case 'no':
          return !item.completed;
        default:
          return true;
      }
    },
  };

  const sortFunctions: UseFilterSortingFunctions<BookProgressEntry> = {
    name: (a, b) => a.name.localeCompare(b.name),
    progress: (a, b) => (a.progress >= b.progress ? 1 : -1),
  };

  const { filteredData, filters, sort, noResults } = useFilterData<
    NonNullable<DashboardBooksProgressGetResponse['data']>['booksProgress'][0]
  >({
    data: booksProgress,
    filterFunctions,
    sortFunctions,
  });

  return (
    <FiltersShell
      onRenderFilters={() => {
        return <DashboardBooksProgressFiltering filters={filters} sort={sort} />;
      }}
    >
      <div className="p-4 grow flex flex-col justify-between gap-4">
        {booksProgress.length > 0 && <span className="font-medium">Showing {filteredData.length} Books</span>}

        {noResults ? (
          <p className="my-auto text-center">
            It looks like there are <strong>no books</strong> that match your current filters, try adjusting your
            filters!
          </p>
        ) : (
          <>
            {filteredData.length > 0 && (
              <>
                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3 mt-2">
                  {filteredData.map((bookProgress) => {
                    return (
                      <DashboardBooksProgressCard
                        cover={bookProgress.cover}
                        id={bookProgress.id}
                        key={`dashboard-books-progress-${bookProgress.id}`}
                        name={bookProgress.name}
                        progress={bookProgress.progress}
                      />
                    );
                  })}
                </div>
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

export default DashboardBooksProgressFeed;
