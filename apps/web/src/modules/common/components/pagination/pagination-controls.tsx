'use client';

import React from 'react';
import {
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@read-quill/design-system';

export interface PaginationControlsProps {
  perPageTitle: string;
  page: number;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  previousPage: () => void;
  nextPage: () => void;
  setPageIndex: (index: number) => void;
  pageCount: number;
  setPageSize?: (size: number) => void;
  pageSize?: number;
}
const PAGE_SIZES = [2, 4, 6, 12, 16, 20];

const PaginationControls: React.FC<PaginationControlsProps> = (props) => {
  const {
    perPageTitle,
    pageCount,
    page,
    getCanPreviousPage,
    getCanNextPage,
    nextPage,
    previousPage,
    setPageIndex,
    pageSize,
    setPageSize,
  } = props;

  return (
    <div className="flex justify-end flex-col items-end sm:items-center sm:flex-row gap-4">
      {pageSize && setPageSize ? (
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{perPageTitle}</p>
          <Select
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
            value={`${pageSize}`}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {PAGE_SIZES.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}
      <div className="flex gap-2 items-center">
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
    </div>
  );
};

export default PaginationControls;
