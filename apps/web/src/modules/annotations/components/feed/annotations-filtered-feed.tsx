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
import { LayoutListIcon, Skeleton } from '@read-quill/design-system';
import { ToggleGroup } from '@read-quill/design-system';
import { ToggleGroupItem } from '@read-quill/design-system';
import { LayoutGridIcon } from '@read-quill/design-system';
import { Annotation } from '@read-quill/database';
import AnnotationsFiltering from './annotations-feed-filtering';
import AnnotationsFeed from './annotations-feed';

interface AnnotationsFilteredFeedProps extends Omit<PaginationControlsProps, 'perPageTitle'> {
  annotations: Annotation[];
  isLoading: boolean;
  children: React.ReactNode;
}

const AnnotationsFilteredFeed: React.FC<AnnotationsFilteredFeedProps> = (props) => {
  const {
    annotations,
    page,
    pageCount,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    previousPage,
    setPageIndex,
    pageSize,
    setPageSize,
    isLoading,
    children,
  } = props;

  const [cardVariant, setCardVariant] = useState<'vertical' | 'landscape'>('vertical');

  const filterFunctions: UseFilterFilteringFunctions<Annotation> = {
    title: (item, value) => item.title.toLowerCase().includes((value as string).toLowerCase()),
    chapter: (item, value) => item.chapter.toLowerCase().includes((value as string).toLowerCase()),
  };

  const sortFunctions: UseFilterSortingFunctions<Annotation> = {
    title: (a, b) => a.title.localeCompare(b.title),
    chapter: (a, b) => a.chapter.localeCompare(b.chapter),

    createdAt: (a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt) : new Date();
      const bDate = b.createdAt ? new Date(b.createdAt) : new Date();

      return compareAsc(aDate, bDate);
    },
  };

  const { filteredData, filters, sort, noResults } = useFilterData<Annotation>({
    data: annotations,
    filterFunctions,
    sortFunctions,
  });

  return (
    <FiltersShell
      onRenderFilters={() => {
        return <AnnotationsFiltering filters={filters} sort={sort} />;
      }}
    >
      <div className="p-4 grow flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between">
          {isLoading ? (
            <Skeleton className="h-5 w-44" />
          ) : (
            <span className="font-medium">Showing {filteredData.length} Annotations</span>
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
            It looks like there are <strong>no annotations</strong> that match your current filters, try adjusting your
            filters!
          </p>
        ) : (
          <>
            {annotations.length > 0 && (
              <>
                <AnnotationsFeed className="flex-1" annotations={filteredData} />
                <PaginationControls
                  perPageTitle="Books per page"
                  getCanNextPage={getCanNextPage}
                  getCanPreviousPage={getCanPreviousPage}
                  nextPage={nextPage}
                  page={page}
                  pageCount={pageCount}
                  previousPage={previousPage}
                  setPageIndex={setPageIndex}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
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

export default AnnotationsFilteredFeed;
