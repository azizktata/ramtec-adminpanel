"use client";

import * as React from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import DataTable from "@/components/shared/dataTable";
// import { Product } from "@/types/product";
import { DataTableProps } from "@/types/data-table";
import { CategoryWithProducts } from "@/types/category-with-products";
// Prisma.ProductGetPayload<{
//     include: { images: true };
//   }>
export default function CategoriesTable({
  data,
  columns,
  pagination,
}: DataTableProps<CategoryWithProducts>) {
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
