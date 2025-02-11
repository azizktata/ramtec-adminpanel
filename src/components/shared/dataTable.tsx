"use client";

import * as React from "react";
import { Table as TableType, flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Typography from "@/components/ui/typography";
import { PaginationProps } from "@/types/pagination";
import { getPaginationButtons } from "@/utils/getPaginationButtons";
import { usePathname, useSearchParams } from "next/navigation";

interface DataTableProps<TData> {
  table: TableType<TData>;
  pagination: PaginationProps;
}

export default function DataTable<TData>({
  table,
  pagination,
}: DataTableProps<TData>) {
  const paginationButtons = getPaginationButtons({
    totalPages: pagination.pages,
    currentPage: pagination.current,
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="rounded-md border overflow-hidden">
      {/* data table */}
      <Table>
        <TableHeader className="bg-popover">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="uppercase whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-transparent"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.options.columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3.5 p-4 bg-popover text-muted-foreground">
        <Typography className="text-sm flex-shrink-0 uppercase font-medium">
          Showing{" "}
          {Math.max((pagination.current - 1) * pagination.perPage + 1, 1)} to{" "}
          {Math.min(pagination.current * pagination.perPage, pagination.items)}{" "}
          of {pagination.items}
        </Typography>

        <Pagination>
          <PaginationContent className="flex-wrap">
            <PaginationItem>
              {pagination.prev ? (
                (() => {
                  const params = new URLSearchParams(searchParams.toString()); // Clone existing search params
                  params.set("perPage", pagination.perPage.toString()); // Ensure it's a string
                  params.set("page", pagination.prev.toString()); // Ensure it's a string

                  return (
                    <PaginationPrevious
                      href={`${pathname}?${params.toString()}`}
                    />
                  );
                })()
              ) : (
                <PaginationPrevious className="disabled" />
              )}
            </PaginationItem>

            {paginationButtons.map((page, index) => (
              <PaginationItem key={`page-${index}`}>
                {page === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  (() => {
                    const params = new URLSearchParams(searchParams.toString()); // Clone existing search params
                    params.set("perPage", pagination.perPage.toString()); // Ensure it's a string
                    params.set("page", page.toString()); // Ensure it's a string
                    return (
                      <PaginationLink
                        href={`${pathname}?${params.toString()}`}
                        isActive={page === pagination.current}
                      >
                        {page}
                      </PaginationLink>
                    );
                  })()
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              {pagination.next ? (
                (() => {
                  const params = new URLSearchParams(searchParams.toString()); // Clone existing search params
                  params.set("perPage", pagination.perPage.toString()); // Ensure it's a string
                  params.set("page", pagination.next.toString()); // Ensure it's a string

                  return (
                    <PaginationNext href={`${pathname}?${params.toString()}`} />
                  );
                })()
              ) : (
                <PaginationNext className="disabled" />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
