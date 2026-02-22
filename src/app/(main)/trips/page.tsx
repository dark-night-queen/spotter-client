"use client";

import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";

import { schema } from "./_constants";
import { DataTable } from "./_components/data-table";
import { DataTableToolbar } from "./_components/data-table-toolbar";
import { Pagination } from "./_components/data-table-pagination";
import { TableCellViewer } from "./_components/table-cell-viewer";
import { useTripAll } from "@/lib/network/queries/trip.queries";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { TextSearch } from "lucide-react";

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      const tripId = row.getValue("id") as string;
      return (
        <div className="w-[20px] truncate" title={tripId}>
          {tripId}
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "start_address",
    header: "Starting Point",
    cell: ({ row }) => (
      <TableCellViewer
        tripId={row.original.id}
        address={row.original.start_address}
      />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "pickup_address",
    header: "Pick Up Address",
    cell: ({ row }) => {
      const address = row.getValue("pickup_address") as string;
      return (
        <div className="max-w-[200px] truncate" title={address}>
          {address}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "drop_off_address",
    header: "Final Destination",
    cell: ({ row }) => {
      const address = row.getValue("drop_off_address") as string;
      return (
        <div className="max-w-[200px] truncate font-medium" title={address}>
          {address}
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <Link href={`/trips/${row.original.id}`}>
            <DropdownMenuItem>
              <TextSearch />
              View
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function Trips() {
  const { data, isLoading } = useTripAll();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-4 overflow-auto">
      <DataTableToolbar table={table} />
      <DataTable data={data} columns={columns} table={table} />
      <Pagination table={table} />
    </div>
  );
}

export default Trips;
