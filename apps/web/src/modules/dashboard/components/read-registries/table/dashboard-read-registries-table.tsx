'use client';

import React, { useMemo, useState } from 'react';
import { DataTableColumnHeader } from '@read-quill/design-system';
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { DataTable } from '@read-quill/design-system/src';
import { useReadRegistries } from '@modules/dashboard/hooks/use-read-registries';
import type { DashboardReadRegistry } from '@modules/api/types/dashboard-api.types';
import DashboardReadRegistriesRowActions from './dashboard-read-registries-row-actions';

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
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
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

          return <div>{bookName}</div>;
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

  return <DataTable table={table} />;
};

export default DashboardReadRegistriesTable;
