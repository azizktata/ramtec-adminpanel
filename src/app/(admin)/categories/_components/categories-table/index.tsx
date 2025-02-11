"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { columns, skeletonColumns } from "./Columns";
import TableSkeleton from "@/components/shared/tableSkeleton";
import TableError from "@/components/shared/tableError";
import CategoriesTable from "./Table";
import { CategoryWithProducts } from "@/types/category-with-products";

export default function ShowCategoriesTable({
  categories,
  numberOfCategories,
}: {
  categories: CategoryWithProducts[];
  numberOfCategories: number;
}) {
  const perPage = useSearchParams().get("perPage") || 5;
  const page = useSearchParams().get("page") || 1;
  const category = useSearchParams().get("category") || null;
  const search = useSearchParams().get("search") || null;
  const thereIsFilter = category || search ? true : false;
  const items = thereIsFilter ? categories.length : numberOfCategories;
  const numberOfPages =
    items > Number(perPage) ? Math.trunc(items / Number(+perPage)) : 1;

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
    <CategoriesTable
      columns={columns}
      data={categories}
      pagination={pagination}
    />
  );
}
