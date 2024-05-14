import React from 'react';
import type { DashboardBooksProgressGetResponse } from '@modules/api/types/dashboard-api.types';
import type { PaginationControlsProps } from '@modules/common/components/pagination/pagination-controls';
import PaginationControls from '@modules/common/components/pagination/pagination-controls';
import type { UseFilterFilteringFunctions, UseFilterSortingFunctions } from '@modules/filters/hooks/use-filter-data';
import { useFilterData } from '@modules/filters/hooks/use-filter-data';
import FiltersShell from '@modules/filters/components/filters-shell';
import DashboardBooksProgressCard from './dashboard-books-progress-card';
import DashboardBooksProgressFiltering from './filtering/dashboard-books-progress-filtering';

interface DashboardBooksProgressFeedProps extends PaginationControlsProps {
  booksProgress: DashboardBooksProgressGetResponse['booksProgress'];
}

const DashboardBooksProgressFeed: React.FC<DashboardBooksProgressFeedProps> = (props) => {
  const { booksProgress, page, pageCount, getCanNextPage, getCanPreviousPage, nextPage, previousPage, setPageIndex } =
    props;

  const filterFunctions: UseFilterFilteringFunctions<DashboardBooksProgressGetResponse['booksProgress'][0]> = {
    name: (item, value) => item.name.toLowerCase().includes((value as string).toLowerCase()),
    progress: (item, value) => (value as number) >= item.progress,
  };

  const sortFunctions: UseFilterSortingFunctions<DashboardBooksProgressGetResponse['booksProgress'][0]> = {
    name: (a, b) => a.name.localeCompare(b.name),
    progress: (a, b) => (a.progress >= b.progress ? 1 : -1),
  };

  const { filteredData, filters, sort } = useFilterData<DashboardBooksProgressGetResponse['booksProgress'][0]>({
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
      <div className="p-4 grow space-y-4">
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
      </div>
    </FiltersShell>
  );
};

export default DashboardBooksProgressFeed;
