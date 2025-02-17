"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Order } from "@/types/order";
import { DataTableProps } from "@/types/data-table";
import DataTable from "@/components/shared/dataTable";

export default function OrdersTable({
  data,
  columns,
  pagination,
}: DataTableProps<Order>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} pagination={pagination} />;
}
