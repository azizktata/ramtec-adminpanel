"use client";

import { useSearchParams } from "next/navigation";

import { columns } from "./Columns";

import { Seller } from "@prisma/client";
import SellersTable from "./Table";

export default function ShowSellersTable({
  sellers,
  numberOfSellers,
}: {
  sellers: Seller[];
  numberOfSellers: number;
}) {
  const perPage = useSearchParams().get("perPage") || 5;
  const page = useSearchParams().get("page") || 1;
  const search = useSearchParams().get("search") || null;
  const thereIsFilter = search ? true : false;
  const items = thereIsFilter ? sellers.length : numberOfSellers;
  const numberOfPages =
    items > Number(perPage) ? Math.ceil(items / Number(+perPage)) : 1;

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
    <SellersTable columns={columns} data={sellers} pagination={pagination} />
  );
}
