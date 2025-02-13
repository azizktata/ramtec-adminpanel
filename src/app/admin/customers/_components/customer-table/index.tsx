"use client";

import { useSearchParams } from "next/navigation";

import { columns } from "./Columns";

import { Customer } from "@prisma/client";
import CustomersTable from "./Table";

export default function ShowCustomersTable({
  customers,
  numberOfCustomers,
}: {
  customers: Customer[];
  numberOfCustomers: number;
}) {
  const perPage = useSearchParams().get("perPage") || 5;
  const page = useSearchParams().get("page") || 1;
  const search = useSearchParams().get("search") || null;
  const thereIsFilter = search ? true : false;
  const items = thereIsFilter ? customers.length : numberOfCustomers;
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
    <CustomersTable
      columns={columns}
      data={customers}
      pagination={pagination}
    />
  );
}
