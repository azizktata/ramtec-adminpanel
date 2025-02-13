"use client";

import * as React from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import DataTable from "@/components/shared/dataTable";
// import { Product } from "@/types/product";
import { DataTableProps } from "@/types/data-table";
import { Customer } from "@prisma/client";
// Prisma.ProductGetPayload<{
//     include: { images: true };
//   }>
export default function CustomersTable({
  data,
  columns,
  pagination,
}: DataTableProps<Customer>) {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return <DataTable table={table} pagination={pagination} />;
}
