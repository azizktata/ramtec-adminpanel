"use client";

import { useSearchParams } from "next/navigation";

import { columns } from "./Columns";

import PartnersTable from "./Table";
import { MarquesAll } from "@/types/marques";

export default function ShowMarquesTable({
  marques,
  numberOfMarques,
}: {
  marques: MarquesAll[];
  numberOfMarques: number;
}) {
  const perPage = useSearchParams().get("perPage") || 5;
  const page = useSearchParams().get("page") || 1;
  const category = useSearchParams().get("category") || null;
  const search = useSearchParams().get("search") || null;
  const thereIsFilter = category || search ? true : false;
  const items = thereIsFilter ? marques.length : numberOfMarques;
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
    <PartnersTable columns={columns} data={marques} pagination={pagination} />
  );
}
