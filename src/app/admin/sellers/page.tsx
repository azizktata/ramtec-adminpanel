import Typography from "@/components/ui/typography";
import React from "react";
import prisma from "@/lib/db";

import SellerActions from "./_components/SellerActions";
import SellerFilters from "./_components/SellerFilters";
import ShowSellersTable from "./_components/seller-table";

export default async function Sellers({
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
  const sellers = await prisma.seller.findMany({
    where,
    take,
    skip,
    orderBy,
  });
  const numberOfSellers = await prisma.seller.count();
  return (
    <>
      <section>
        <Typography variant="h1" className="mb-6">
          Re-sellers
        </Typography>

        <div className="space-y-8 mb-8">
          <SellerActions />
          <SellerFilters />
          <ShowSellersTable
            sellers={sellers}
            numberOfSellers={numberOfSellers}
          />
        </div>
      </section>
    </>
  );
}
