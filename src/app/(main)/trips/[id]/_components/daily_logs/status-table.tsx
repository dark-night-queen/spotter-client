"use client";

import { z } from "zod";
import { Clock, MessageSquare } from "lucide-react";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface StatusChange {
  status: string;
  start_time: string;
  end_time: string;
  location_text: string;
  remarks: string;
}

export const schema = z.object({
  status: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  location_text: z.string(),
  remarks: z.string(),
});

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "start_time",
    header: "Start Time",
    cell: ({ row }) => (
      <span className="font-mono text-xs font-medium">
        {new Date(row.original.start_time).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Duty Status",
    cell: ({ row }) => {
      const val = row.original.status;
      const variants: Record<string, string> = {
        DRIVING: "bg-emerald-50 text-emerald-700 border-emerald-50",
        ON_DUTY: "bg-amber-50 text-amber-700 border-amber-50",
        OFF_DUTY: "bg-slate-50 text-slate-700 border-slate-50",
        SLEEPER_BERTH: "bg-indigo-100 text-indigo-700 border-indigo-50",
      };
      return (
        <Badge
          variant="outline"
          className={`capitalize font-semibold ${variants[val] || ""}`}
        >
          {val.replace("_", " ").toLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: (info) => {
      const row = info.row.original;
      const diffMs =
        new Date(row.end_time).getTime() - new Date(row.start_time).getTime();
      const hrs = Math.floor(diffMs / 3600000);
      const mins = Math.round((diffMs % 3600000) / 60000);
      return (
        <div className="flex items-center gap-1.5 text-slate-600">
          <Clock className="h-3 w-3" />
          <span>
            {hrs}h {mins}m
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 italic text-slate-400">
        <MessageSquare className="h-3 w-3 shrink-0" />
        <span>{row.original.remarks || "-"}</span>
      </div>
    ),
  },
];

export function StatusTable({ data }: { data: StatusChange[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-[10px] uppercase font-bold tracking-wider text-slate-500 py-3"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-slate-50/50">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="py-3 px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
