'use client';

import React, { useMemo, useState } from 'react';
import { Button, Checkbox, DataTableColumnHeader, DataTableViewOptions, DeleteIcon } from '@read-quill/design-system';
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { DataTable, DataTablePagination } from '@read-quill/design-system/src';

import { UseBookReadRegistriesReturn } from '@modules/books/hooks/use-book-read-registries';
import { ReadRegistry } from '@read-quill/database';
import UserBookReadRegistriesRowActions from './user-book-read-registries-row-actions';
import ReadRegistryDeleteMultiple from '@modules/read-registries/components/delete-multiple/read-registry-delete-multiple';
import { useQueriesStore } from '@modules/queries/state/queries.slice';

interface UserBookReadRegistriesTableProps
  extends Pick<UseBookReadRegistriesReturn, 'data' | 'pagination' | 'setPagination'> {}

const UserBookReadRegistriesTable: React.FC<UserBookReadRegistriesTableProps> = (props) => {
  const { data, pagination, setPagination } = props;

  const { queryClient } = useQueriesStore();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<ReadRegistry>[] = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
            onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
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
          return <UserBookReadRegistriesRowActions row={row} />;
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
      rowSelection,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  const selectedRowsIds = table.getSelectedRowModel().rows.map((selectedRow) => selectedRow.original.id);

  const onSelectedRegistriesDeleted = async () => {
    await queryClient.refetchQueries(['book-read-registries']);
    table.resetRowSelection();
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        {(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) && (
          <ReadRegistryDeleteMultiple
            registryIds={selectedRowsIds}
            onSuccess={onSelectedRegistriesDeleted}
            deleteButton={
              <Button variant="outline-destructive">
                <DeleteIcon className="mr-2 stroke-current" size="sm" />
                Delete Selected
              </Button>
            }
          />
        )}
        <DataTableViewOptions table={table} />
      </div>
      <div className="max-h-[600px] overflow-y-auto">
        <DataTable table={table} />
      </div>
      <DataTablePagination pageSizes={[4, 8, 10, 16, 20]} table={table} />
    </div>
  );
};

export default UserBookReadRegistriesTable;
