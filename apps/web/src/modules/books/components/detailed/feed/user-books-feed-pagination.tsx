'use client';

import React from 'react';
import { Button } from '@read-quill/design-system';
import type { UserBooksGetResponse } from '@modules/api/types/books-api.types';
import type { UseUserBooksReturn } from '@modules/books/hooks/use-user-books';

interface UserBooksFeedPaginationProps {
  pageCount: UserBooksGetResponse['pageCount'];
  page: UseUserBooksReturn['page'];
  previousPage: UseUserBooksReturn['previousPage'];
  nextPage: UseUserBooksReturn['nextPage'];
  getCanPreviousPage: UseUserBooksReturn['getCanPreviousPage'];
  getCanNextPage: UseUserBooksReturn['getCanNextPage'];
}

const UserBooksFeedPagination: React.FC<UserBooksFeedPaginationProps> = (props) => {
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

export default UserBooksFeedPagination;
