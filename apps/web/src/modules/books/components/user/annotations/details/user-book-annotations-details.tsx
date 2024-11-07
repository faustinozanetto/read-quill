'use client';

import React, { useState } from 'react';
import {
  ANNOTATIONS_INITIAL_FILTERS,
  ANNOTATIONS_INITIAL_SORT,
} from '@modules/annotations/lib/annotations-filtering.lib';
import { FilterProvider } from '@modules/filters/components/filter-provider';
import AnnotationsFilteredFeed from '@modules/annotations/components/feed/annotations-filtered-feed';
import { useBookAnnotations } from '@modules/books/hooks/annotations/use-book-annotations';
import { useBookContext } from '@modules/books/hooks/use-book-context';
import AnnotationCardPlaceholder from '@modules/annotations/components/cards/annotation-card-placeholder';
import UserBookAnnotationsHeader from '../user-book-annotations-header';

const UserBookAnnotationsDetails: React.FC = () => {
  const [pageSize, setPageSize] = useState(6);

  const { book } = useBookContext();
  const { data, isLoading, getCanNextPage, getCanPreviousPage, nextPage, page, previousPage, setPageIndex } =
    useBookAnnotations({ bookId: book?.id, pageSize });

  return (
    <div className="flex flex-col rounded-lg p-4 border gap-2">
      <UserBookAnnotationsHeader showManageLink={false} />
      <p>
        View and manage your book annotations here, use the filters to browse them in a efficient way. You can also
        create ones using the Create button.
      </p>
      <FilterProvider
        initialState={{
          initialFilters: ANNOTATIONS_INITIAL_FILTERS,
          initialSort: ANNOTATIONS_INITIAL_SORT,
        }}
      >
        <div className="rounded-lg border space-y-4">
          <AnnotationsFilteredFeed
            annotations={data?.data?.annotations ?? []}
            getCanNextPage={getCanNextPage}
            getCanPreviousPage={getCanPreviousPage}
            nextPage={nextPage}
            page={page}
            pageCount={data?.data?.pageCount ?? 0}
            previousPage={previousPage}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isLoading={isLoading}
          >
            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                {Array.from({ length: pageSize }).map((_, i) => (
                  <AnnotationCardPlaceholder key={`annotation-placeholder-${i}`} />
                ))}
              </div>
            ) : null}

            {!isLoading && !data?.data?.annotations.length ? (
              <p className="m-auto">
                Let&apos;s build your book collection! Click the{' '}
                <span className="text-primary text-center font-bold underline">Create Book</span> button to get started.
              </p>
            ) : null}
          </AnnotationsFilteredFeed>
        </div>
      </FilterProvider>
    </div>
  );
};

export default UserBookAnnotationsDetails;
