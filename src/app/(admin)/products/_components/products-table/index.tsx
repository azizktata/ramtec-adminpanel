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

export default function AllProducts({ products }: { products: ProductALL[] }) {
  const productsPage = useSearchParams().get("page");
  const page = Math.trunc(Number(productsPage)) || 1;

  // const {
  //   data: products,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["products", page],
  //   queryFn: () => fetchProducts({ page, perPage }),
  //   placeholderData: keepPreviousData,
  //   select: (productsData) => {
  //     const { data, pages, ...rest } = productsData;

  //     return {
  //       data: data,
  //       pagination: {
  //         ...rest,
  //         pages,
  //         current: page < 1 ? 1 : Math.min(page, pages),
  //         perPage,
  //       },
  //     };
  //   },
  // });

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
    <ProductsTable columns={columns} data={products} pagination={pagination} />
  );
}
