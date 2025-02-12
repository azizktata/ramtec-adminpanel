"use client";

import { useSearchParams } from "next/navigation";

import { columns } from "./Columns";

import OrdersTable from "./Table";
import { OrderALL } from "@/types/orders-includeAll";

export default function AllOrders({
  orders,
  numberOfOrders,
}: {
  orders: OrderALL[];
  numberOfOrders: number;
}) {
  const perPage = useSearchParams().get("perPage") || 5;
  const page = useSearchParams().get("page") || 1;
  const category = useSearchParams().get("category") || null;
  const search = useSearchParams().get("search") || null;
  const thereIsFilter = category || search ? true : false;
  const items = thereIsFilter ? orders.length : numberOfOrders;
  const numberOfPages =
    items > Number(perPage) ? Math.trunc(items / Number(+perPage)) : 1;

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
    <OrdersTable columns={columns} data={orders} pagination={pagination} />
  );
}
