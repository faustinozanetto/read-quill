'use client';

import React from 'react';
import {
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from '@read-quill/design-system';
import type { UseBooksProgressReturn } from '@modules/dashboard/hooks/use-books-progress';
import type { DashboardBooksProgressGetResponse } from '@modules/api/types/dashboard-api.types';

type DashboardBooksProgressFeedProps = Pick<
  UseBooksProgressReturn,
  'setPageIndex' | 'getCanNextPage' | 'getCanPreviousPage' | 'nextPage' | 'previousPage' | 'page'
> & {
  pageCount: DashboardBooksProgressGetResponse['pageCount'];
};

const DashboardBooksProgressFeedPagination: React.FC<DashboardBooksProgressFeedProps> = (props) => {
  const { pageCount, page, getCanPreviousPage, getCanNextPage, nextPage, previousPage, setPageIndex } = props;

  return (
    <div className="flex items-center space-x-6 lg:space-x-8 justify-end">
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {page + 1} of {pageCount}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          aria-label="Goto First Page"
          className="h-8 w-8 p-0"
          disabled={!getCanPreviousPage()}
          onClick={() => {
            setPageIndex(0);
          }}
          variant="outline"
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Goto Previous Page"
          className="h-8 w-8 p-0"
          disabled={!getCanPreviousPage()}
          onClick={() => {
            previousPage();
          }}
          variant="outline"
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Goto Next Page"
          className="h-8 w-8 p-0"
          disabled={!getCanNextPage()}
          onClick={() => {
            nextPage();
          }}
          variant="outline"
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Goto Last Page"
          className="h-8 w-8 p-0"
          disabled={!getCanNextPage()}
          onClick={() => {
            setPageIndex(pageCount - 1);
          }}
          variant="outline"
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardBooksProgressFeedPagination;
