import Typography from "@/components/ui/typography";
import { Metadata } from "next";
import SalesOverview from "./_components/SalesOverview";
import StatusOverview from "./_components/StatusOverview";
import DashboardCharts from "./_components/charts";
import prisma from "@/lib/db";
import { SalesSummary } from "./_types/SalesSummary";
import { StatusSummary } from "./_types/StatusSummary";
import {
  getLast7DaysSales,
  getLastMonthOrders,
  getThisMonthOrders,
} from "@/actions/orders";
import { getBestSellingProducts } from "@/actions/product";
import { RecentSales } from "./_components/RecentSales";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const todayOrders = await prisma.order.findMany({
    select: {
      id: true,
      orderTime: true,
      amount: true,
    },
    where: {
      orderTime: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  });
  const yesterdayOrders = await prisma.order.findMany({
    select: {
      id: true,
      orderTime: true,
      amount: true,
    },
    where: {
      orderTime: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(0, 0, 0, 0) - 1),
      },
    },
  });

  const thisMonthOrders = await getThisMonthOrders();

  const lastMonthOrders = await getLastMonthOrders();

  const allDeliveredOrders = await prisma.order.findMany({
    select: {
      id: true,
      orderTime: true,
      amount: true,
      status: true,
    },
    where: {
      status: {
        equals: "DELIVERED",
      },
    },
  });

  const salesSummary: SalesSummary = {
    today: {
      totalAmount: todayOrders.reduce((acc, item) => acc + item.amount, 0),
    },
    yesterday: {
      totalAmount: yesterdayOrders.reduce((acc, item) => acc + item.amount, 0),
    },
    thisMonth: {
      totalAmount: thisMonthOrders.reduce((acc, item) => acc + item.amount, 0),
    },
    lastMonth: {
      totalAmount: lastMonthOrders.reduce((acc, item) => acc + item.amount, 0),
    },
    allTime: {
      totalAmount: allDeliveredOrders.reduce(
        (acc, item) => acc + item.amount,
        0
      ),
    },
  };
  const statusSummary: StatusSummary = {
    processing: await prisma.order.count({
      where: { status: { equals: "PROCESSING" } },
    }),
    pending: await prisma.order.count({
      where: { status: { equals: "PENDING" } },
    }),
    delivered: await prisma.order.count({
      where: { status: { equals: "DELIVERED" } },
    }),
    total: await prisma.order.count(),
  };

  const getLast7DaysSalesData = await getLast7DaysSales();
  const bestSellersData = await getBestSellingProducts();
  return (
    <>
      <section>
        <Typography variant="h1" className="mb-6">
          Dashboard Overview
        </Typography>

        <div className="space-y-8 mb-8">
          <SalesOverview salesSummary={salesSummary} />
          <StatusOverview statusSummary={statusSummary} />

          <DashboardCharts
            last7DaysSales={getLast7DaysSalesData}
            bestSellers={bestSellersData}
          />
        </div>
      </section>

      <section>
        <div className="max-w-2xl mx-auto">
          <RecentSales />
        </div>
      </section>
      {/* <section>
        <Typography variant="h2" className="mb-6">
          Recent Orders
        </Typography>

        <RecentOrders />
      </section> */}
    </>
  );
}
