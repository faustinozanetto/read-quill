'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
  Skeleton,
} from '@read-quill/design-system';
import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { Book, ReadRegistry } from '@read-quill/database';
import { useQueryClient } from '@tanstack/react-query';
import DashboardReadRegistriesRowActions from './dashboard-read-registries-row-actions';

interface DashboardReadRegistriesTableProps {
  readRegistries: ReadRegistry[];
}

const DashboardReadRegistriesTable: React.FC<DashboardReadRegistriesTableProps> = (props) => {
  const { readRegistries } = props;

  const queryClient = useQueryClient();
  const books = queryClient.getQueryData<Book[]>(['dashboard-books']) ?? [];

  const columns: ColumnDef<ReadRegistry>[] = [
    {
      accessorKey: 'pagesRead',
      header: 'Pages Read',
      cell: ({ row }) => <div className="font-medium">{row.getValue('pagesRead')}</div>,
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const value = new Date(row.getValue<string>('createdAt'));
        const formatted = new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
        }).format(value);

        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: 'bookId',
      header: 'Book',
      cell: ({ row }) => {
        const bookId = row.getValue<string>('bookId');

        const book = books.find((b) => b.id === bookId);
        if (!book) return <Skeleton className="h-4 w-full" />;

        return <div>{book.name}</div>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return <DashboardReadRegistriesRowActions row={row} />;
      },
    },
  ];

  const table = useReactTable({
    data: readRegistries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow data-state={row.getIsSelected() && 'selected'} key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={columns.length}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.previousPage();
            }}
            size="sm"
            variant="outline"
          >
            Previous
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => {
              table.nextPage();
            }}
            size="sm"
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardReadRegistriesTable;
