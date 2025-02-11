import Typography from "@/components/ui/typography";
import React from "react";
import ShowCustomersTable from "./_components/customer-table";
import prisma from "@/lib/db";
import CustomerActions from "./_components/CustomerActions";
import CustomerFilters from "./_components/CustomerFilters";

export default async function Customers({
  searchParams,
}: {
  searchParams: {
    perPage: number;
    page: number;
    search: string;
    filter:
      | "date-added-asc"
      | "date-added-desc"
      | "date-updated-asc"
      | "date-updated-desc";
  };
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where = {} as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orderBy = {} as any;
  const perPage = (await searchParams).perPage || 5;
  const page = (await searchParams).page || 1;
  const take = +perPage;
  const skip = (page - 1) * perPage;

  if ((await searchParams).search) {
    where.OR = [
      { name: { contains: (await searchParams).search } },
      { email: { contains: (await searchParams).search } },
      { phone: { contains: (await searchParams).search } },
      { address: { contains: (await searchParams).search } },
    ];
  }

  switch (await searchParams.filter) {
    case "date-added-asc":
      orderBy.createdAt = "asc";
      break;
    case "date-added-desc":
      orderBy.createdAt = "desc";
      break;
    case "date-updated-asc":
      orderBy.updatedAt = "asc";
      break;
    case "date-updated-desc":
      orderBy.updatedAt = "desc";
      break;
  }
  const customers = await prisma.customer.findMany({
    where,
    take,
    skip,
    orderBy,
  });
  return (
    <>
      <section>
        <Typography variant="h1" className="mb-6">
          Customers
        </Typography>

        <div className="space-y-8 mb-8">
          <CustomerActions />
          <CustomerFilters />
          <ShowCustomersTable customers={customers} />
          {/*
           */}

          {/* <DashboardCharts /> */}
        </div>
      </section>
    </>
  );
}
