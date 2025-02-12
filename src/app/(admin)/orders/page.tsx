import Typography from "@/components/ui/typography";
import React from "react";

import prisma from "@/lib/db";
import OrderFilters from "./_components/OrderFilter";
import AllOrders from "./_components/orders-table";
import { OrderMethod } from "@prisma/client";

export default async function Orders({
  searchParams,
}: {
  searchParams: {
    status: "pending" | "processing" | "delivered" | "cancel";

    method: "cash" | "card" | "credit";
    limit: "5" | "7" | "14" | "30";
    startDate: string;
    endDate: string;

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

  const skip = (page - 1) * perPage;

  if ((await searchParams).search) {
    where.OR = [
      { invoiceNo: { contains: (await searchParams).search } },
      { customer: { name: { contains: (await searchParams).search } } },
      // { customer: { email: { contains: (await searchParams).search } } },
      // { amount: { contains: (await searchParams).search } },
    ];
  }
  if ((await searchParams).startDate) {
    where.orderTime = {
      gte: new Date((await searchParams).startDate),
    };
  }
  if ((await searchParams).endDate) {
    where.orderTime = {
      lte: new Date((await searchParams).endDate),
    };
  }
  // Apply filter conditions
  switch ((await searchParams).status) {
    case "pending":
      where.status = "PENDING";
      break;
    case "processing":
      where.status = "PROCESSING";
      break;
    case "delivered":
      where.status = "DELIVERED";
      break;
    case "cancel":
      where.status = "CANCEL";
      break;
  }
  switch ((await searchParams).method) {
    case "cash":
      where.method = OrderMethod.CASH;
      break;
    case "card":
      where.method = OrderMethod.CARD;
      break;
    case "credit":
      where.method = OrderMethod.CREDIT;
      break;
  }

  switch ((await searchParams).limit) {
    case "5":
      where.orderTime = {
        gte: new Date(new Date().setDate(new Date().getDate() - 5)),
      };
      break;
    case "7":
      where.orderTime = {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      };
      break;
    case "14":
      where.orderTime = {
        gte: new Date(new Date().setDate(new Date().getDate() - 14)),
      };
      break;
    case "30":
      where.orderTime = {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      };
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
