'use client';

import React from 'react';
import { Button } from '@read-quill/design-system';
import type { UseBooksProgressReturn } from '@modules/dashboard/hooks/use-books-progress';
import type { DashboardBooksProgressGetResponse } from '@modules/api/types/dashboard-api.types';

interface DashboardBooksProgressFeedProps {
  pageCount: DashboardBooksProgressGetResponse['pageCount'];
  page: UseBooksProgressReturn['page'];
  previousPage: UseBooksProgressReturn['previousPage'];
  nextPage: UseBooksProgressReturn['nextPage'];
  getCanPreviousPage: UseBooksProgressReturn['getCanPreviousPage'];
  getCanNextPage: UseBooksProgressReturn['getCanNextPage'];
}

const DashboardBooksProgressFeedPagination: React.FC<DashboardBooksProgressFeedProps> = (props) => {
  const { pageCount, page, getCanPreviousPage, getCanNextPage, nextPage, previousPage } = props;

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page + 1} of {pageCount}
      </div>
      <div className="space-x-2">
        <Button
          aria-label="Previous Page"
          disabled={!getCanPreviousPage()}
          onClick={() => {
            previousPage();
          }}
          size="sm"
          variant="outline"
        >
          Previous
        </Button>
        <Button
          aria-label="Next Page"
          disabled={!getCanNextPage()}
          onClick={() => {
            nextPage();
          }}
          size="sm"
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DashboardBooksProgressFeedPagination;
