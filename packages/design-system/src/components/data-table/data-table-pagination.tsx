import type { Table } from '@tanstack/react-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from '../icons';
import { Button } from '../button';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizes: number[];
}

export function DataTablePagination<TData>({ table, pageSizes }: DataTablePaginationProps<TData>): React.JSX.Element {
  return (
    <div className="flex items-center space-x-6 lg:space-x-8 justify-end">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
          value={`${table.getState().pagination.pageSize}`}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizes.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          aria-label="Goto First Page"
          className="h-8 w-8 p-0"
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.setPageIndex(0);
          }}
          variant="outline"
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Goto Previous Page"
          className="h-8 w-8 p-0"
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.previousPage();
          }}
          variant="outline"
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Goto Next Page"
          className="h-8 w-8 p-0"
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.nextPage();
          }}
          variant="outline"
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Goto Last Page"
          className="h-8 w-8 p-0"
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.setPageIndex(table.getPageCount() - 1);
          }}
          variant="outline"
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
