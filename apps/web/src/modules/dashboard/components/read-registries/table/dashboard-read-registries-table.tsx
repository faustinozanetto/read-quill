'use client';

import React, { ChangeEvent, useMemo, useState } from 'react';
import { DataTableColumnHeader, DataTableViewOptions, Input, SearchIcon } from '@read-quill/design-system';
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { DataTable, DataTablePagination } from '@read-quill/design-system/src';
import { useReadRegistries } from '@modules/dashboard/hooks/use-read-registries';
import type { DashboardReadRegistry } from '@modules/api/types/dashboard-api.types';
import DashboardReadRegistriesRowActions from './dashboard-read-registries-row-actions';
import Link from 'next/link';

const DashboardReadRegistriesTable: React.FC = () => {
  const { data, pagination, setPagination } = useReadRegistries();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns: ColumnDef<DashboardReadRegistry>[] = useMemo(
    () => [
      {
        accessorKey: 'pagesRead',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Pages Read" />,
        cell: ({ row }) => {
          const value = row.getValue<number>('pagesRead');

          return <div className="font-bold">{value}</div>;
        },
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Registered At" />,
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
          const bookName = row.original.book.name;

          return (
            <Link className="hover:underline decoration-primary" href={`/books/${row.original.bookId}`}>
              {bookName}
            </Link>
          );
        },
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          return <DashboardReadRegistriesRowActions row={row} />;
        },
      },
    ],
    []
  );
  const handleBooksFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const matchingBook = Object.entries(books).find(([bookId, bookName]) => bookName.includes(value));

    const filterBy = value !== '' && matchingBook ? matchingBook[0] : undefined;
    table.getColumn('bookId')?.setFilterValue(filterBy);
  };

  const books = useMemo(() => {
    return data.readRegistries.reduce<Record<string, string>>((acc, curr) => {
      acc[curr.bookId] = curr.book.name;
      return acc;
    }, {});
  }, [data.readRegistries]);

  const table = useReactTable({
    data: data.readRegistries,
    columns,
    pageCount: data.pageCount,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex sm:justify-between">
        <div className="relative">
          <SearchIcon className="absolute top-2 left-2" />
          <Input placeholder="Filter books..." onChange={handleBooksFilterChange} className="pl-8" />
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="max-h-[600px] overflow-y-auto">
        <DataTable table={table} />
      </div>
      <DataTablePagination pageSizes={[4, 8, 10, 16, 20]} table={table} />
    </div>
  );
};

export default DashboardReadRegistriesTable;
