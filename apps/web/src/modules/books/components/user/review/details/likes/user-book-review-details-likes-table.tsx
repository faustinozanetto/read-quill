import { UseBookReviewDetailsLikesReturn } from '@modules/books/hooks/review/use-book-review-details-likes';
import { BookReviewDetailsLikesEntry } from '@modules/books/types/book.types';
import { LikeReviewType } from '@modules/review/types/review-validations.types';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsSortIcon,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EyeNoneIcon,
  FilterIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  cn,
} from '@read-quill/design-system';
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableViewOptions,
} from '@read-quill/design-system/src';
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { title } from 'process';
import React, { useMemo, useState } from 'react';

interface UserBookReviewDetailsLikesTableProps
  extends Pick<UseBookReviewDetailsLikesReturn, 'pagination' | 'setPagination'> {
  reviewLikes: BookReviewDetailsLikesEntry[];
  pageCount: number;
}

const UserBookReviewDetailsLikesTable: React.FC<UserBookReviewDetailsLikesTableProps> = (props) => {
  const { reviewLikes, pageCount, pagination, setPagination } = props;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columnHelpher = createColumnHelper<BookReviewDetailsLikesEntry>();

  const columns = useMemo(
    () => [
      columnHelpher.accessor('user.image', {
        id: 'User Image',
        header: 'User Image',
        cell: ({ row }) => {
          return (
            <Image
              src={row.original.user.image}
              alt={`${row.original.user.name} Avatar`}
              width={50}
              height={50}
              className="rounded-full border h-9 w-9 aspect-square"
            />
          );
        },
      }),
      columnHelpher.accessor('user.name', {
        id: 'User Name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
        cell: ({ row }) => {
          return (
            <Link href={`/users/${row.original.user.id}`} className="hover:underline">
              {row.original.user.name}
            </Link>
          );
        },
      }),
      columnHelpher.accessor('isLike', {
        id: 'Like Type',
        header: ({ column }) => (
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="-ml-3 h-8 data-[state=open]:bg-accent" size="sm" variant="ghost">
                  Like Type
                  {column.getFilterValue() === 'like' ? (
                    <ThumbsUpIcon className="ml-2 h-4 w-4" />
                  ) : column.getFilterValue() === 'dislike' ? (
                    <ThumbsDownIcon className="ml-2 h-4 w-4" />
                  ) : (
                    <FilterIcon className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={() => {
                    column.setFilterValue('like');
                  }}
                >
                  <ThumbsUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Liked
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    column.setFilterValue('dislike');
                  }}
                >
                  <ThumbsDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Disliked
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    column.setFilterValue(undefined);
                  }}
                >
                  <FilterIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  All
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    column.toggleVisibility(false);
                  }}
                >
                  <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Hide
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
        cell: ({ row }) => {
          const isLike = row.original.isLike;
          return (
            <span className={cn('font-bold', isLike ? 'text-success-foreground' : 'text-destructive-foreground')}>
              {isLike ? 'Liked' : 'Disliked'}
            </span>
          );
        },
        // @ts-ignore
        filterFn: 'filterLikeType',
      }),
    ],
    []
  );

  const filterLikeType = <TData extends BookReviewDetailsLikesEntry>(
    row: Row<TData>,
    columnId: string,
    filterValue: LikeReviewType | undefined
  ) => {
    if (filterValue === undefined) return true;

    return row.original.isLike === (filterValue === 'like' ? true : false);
  };

  const table = useReactTable({
    data: reviewLikes,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      columnFilters: [
        {
          id: 'filterLikeType',
          value: undefined,
        },
      ],
    },
    filterFns: {
      filterLikeType,
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

export default UserBookReviewDetailsLikesTable;
