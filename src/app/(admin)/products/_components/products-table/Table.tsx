"use client";

import * as React from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import DataTable from "@/components/shared/dataTable";
import { DataTableProps } from "@/types/data-table";
import { ProductALL } from "@/types/products-IncludeAll";

export default function ProductsTable({
  data,
  columns,
  pagination,
}: DataTableProps<ProductALL>) {
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
