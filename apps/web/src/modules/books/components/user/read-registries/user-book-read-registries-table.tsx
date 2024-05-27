'use client';

import React, { useMemo, useState } from 'react';
import { DataTableColumnHeader, DataTableViewOptions } from '@read-quill/design-system';
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { DataTable, DataTablePagination } from '@read-quill/design-system/src';

import DashboardReadRegistriesRowActions from '@modules/dashboard/components/read-registries/table/dashboard-read-registries-row-actions';
import { UseBookReadRegistriesReturn } from '@modules/books/hooks/use-book-read-registries';
import { ReadRegistry } from '@read-quill/database';

interface UserBookReadRegistriesTableProps
  extends Pick<UseBookReadRegistriesReturn, 'data' | 'pagination' | 'setPagination'> {}

const UserBookReadRegistriesTable: React.FC<UserBookReadRegistriesTableProps> = (props) => {
  const { data, pagination, setPagination } = props;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns: ColumnDef<ReadRegistry>[] = useMemo(
    () => [
      {
        accessorKey: 'pagesRead',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Pages Read" />,
        cell: ({ row }) => {
          const value = row.getValue<number>('pagesRead');

          return <span className="font-bold">{value}</span>;
        },
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Registered At" />,
        cell: ({ row }) => {
          const value = new Date(row.getValue<string>('createdAt'));
          const formatted = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
          }).format(value);

          return formatted;
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
      <DataTableViewOptions table={table} />
      <div className="max-h-[600px] overflow-y-auto">
        <DataTable table={table} />
      </div>
      <DataTablePagination pageSizes={[4, 8, 10, 16, 20]} table={table} />
    </div>
  );
};

export default UserBookReadRegistriesTable;
