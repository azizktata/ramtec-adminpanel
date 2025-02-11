import Typography from "@/components/ui/typography";
import React from "react";

import prisma from "@/lib/db";
import OrderFilters from "./_components/OrderFilter";
import AllOrders from "./_components/orders-table";

export default async function Orders({
  searchParams,
}: {
  searchParams: {
    filter:
      | "status-pending"
      | "status-processing"
      | "status-delivered"
      | "status-cancel"
      | "methode-cash"
      | "methode-card"
      | "methode-credit"
      | "date-added-asc"
      | "date-added-desc"
      | "date-updated-asc"
      | "date-updated-desc";
    search: string;
    perPage: number;
    page: number;
  };
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orderBy: any = {};
  const perPage = (await searchParams).perPage || 5;
  const page = (await searchParams).page || 1;
  const take = +perPage;
  // page est le coefficient multiplicateur de perPage
  const skip = (page - 1) * perPage;
  // Apply category filter

  if ((await searchParams).search) {
    where.OR = [
      { invoiceNo: { contains: (await searchParams).search } },
      { customer: { name: { contains: (await searchParams).search } } },
      { customer: { email: { contains: (await searchParams).search } } },
      { amount: { contains: (await searchParams).search } },
    ];
  }

  // Apply filter conditions
  switch ((await searchParams).filter) {
    case "status-pending":
      where.status = "PENDING";
      break;
    case "status-processing":
      where.status = "PROCESSING";
      break;
    case "status-delivered":
      where.status = "DELIVERED";
      break;
    case "status-cancel":
      where.status = "CANCEL";
      break;

    case "methode-cash":
      where.status = "CASH";
      break;
    case "methode-card":
      where.status = "CARD";
      break;
    case "methode-credit":
      where.status = "CREDIT";
      break;

    case "date-added-asc":
      orderBy.orderTime = "asc";
      break;
    case "date-added-desc":
      orderBy.orderTime = "desc";
      break;
    case "date-updated-asc":
      orderBy.updatedAt = "asc";
      break;
    case "date-updated-desc":
      orderBy.updatedAt = "desc";
      break;
  }
  const orders = await prisma.order.findMany({
    where,
    skip,
    take,
    include: {
      customer: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
      items: {
        select: {
          product: {
            select: {
              name: true,
            },
          },
          quantity: true,
          price: true,
        },
      },
    },

    orderBy,
  });

  const numberOforders = await prisma.order.count();

  return (
    <>
      <section>
        <Typography variant="h1" className="mb-6">
          Orders
        </Typography>

        <div className="space-y-8 mb-8">
          {/* <OrderActions /> */}
          <OrderFilters />
          <AllOrders orders={orders} numberOfOrders={numberOforders} />
          {/*
           */}

          {/* <DashboardCharts /> */}
        </div>
      </section>
    </>
  );
}
