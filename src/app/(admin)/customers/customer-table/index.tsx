"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { columns, skeletonColumns } from "./Columns";
import ProductsTable from "./Table";
import TableSkeleton from "@/components/shared/tableSkeleton";
import TableError from "@/components/shared/tableError";
import { fetchProducts } from "@/data/products";
import CustomersTable from "./Table";
import prisma from "@/lib/db";
import { Customer, Prisma } from "@prisma/client";

export default function ShowCustomersTable({
  customers,
}: {
  customers: Customer[];
}) {
  //   const productsPage = useSearchParams().get("page");
  //   const page = Math.trunc(Number(productsPage)) || 1;

  //   const {
  //     data: products,
  //     isLoading,
  //     isError,
  //     refetch,
  //   } = useQuery({
  //     queryKey: ["products", page],
  //     queryFn: () => fetchProducts({ page, perPage }),
  //     placeholderData: keepPreviousData,
  //     select: (productsData) => {
  //       const { data, pages, ...rest } = productsData;

  //       return {
  //         data: data,
  //         pagination: {
  //           ...rest,
  //           pages,
  //           current: page < 1 ? 1 : Math.min(page, pages),
  //           perPage,
  //         },
  //       };
  //     },
  //   });

  //
  const pagination = {
    pages: 1,
    current: 1,
    perPage: 10,
    items: 1,
    first: 1,
    last: 1,
    next: null,
    prev: null,
  };

  return (
    <CustomersTable
      columns={columns}
      data={customers}
      pagination={pagination}
    />
  );
}
