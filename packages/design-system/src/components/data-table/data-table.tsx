'use client';

import React from 'react';
import type { Table as TableType } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../..';

interface DataTableProps<TData> {
  table: TableType<TData>;
}

export function DataTable<TData>({ table }: DataTableProps<TData>): React.JSX.Element {
  return (
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
              <TableCell className="h-24 text-center" colSpan={table.getAllColumns().length}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
