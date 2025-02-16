"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { columns, skeletonColumns } from "./Columns";
import ProductsTable from "./Table";
import TableSkeleton from "@/components/shared/tableSkeleton";
import TableError from "@/components/shared/tableError";
import { fetchProducts } from "@/data/products";
import { ProductALL } from "@/types/products-IncludeAll";

// type Props = {
//   perPage?: number;
// };

export default function AllProducts({
  products,
  numberOfProducts,
}: {
  products: ProductALL[];
  numberOfProducts: number;
}) {
  const perPage = useSearchParams().get("perPage") || 5;
  const page = useSearchParams().get("page") || 1;
  const category = useSearchParams().get("category") || null;
  const search = useSearchParams().get("search") || null;
  const thereIsFilter = category || search ? true : false;
  const items = thereIsFilter ? products.length : numberOfProducts;
  const numberOfPages =
    items > Number(perPage) ? Math.ceil(items / Number(+perPage)) : 1;

  // if (isLoading)
  //   return <TableSkeleton perPage={perPage} columns={skeletonColumns} />;

  // if (isError || !products)
  //   return (
  //     <TableError
  //       errorMessage="Something went wrong while trying to fetch products."
  //       refetch={refetch}
  //     />
  //   );
  const pagination = {
    pages: +numberOfPages,
    current: Number(page),
    perPage: Number(perPage),
    items,
    first: 1,
    last: numberOfPages,
    next: items > Number(perPage) ? Number(page) + 1 : null,
    prev: Number(page) > 1 ? Number(page) - 1 : null,
  };
  return (
    <ProductsTable columns={columns} data={products} pagination={pagination} />
  );
}
