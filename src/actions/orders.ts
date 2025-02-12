"use server";

import prisma from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";
import { WeeklySalesData } from "@/app/(admin)/dashboard/_types/WeeklySales";

export async function updateOrderStatus(id: string, orderStatus: OrderStatus) {
  const order = await prisma.order.findFirst({
    where: { invoiceNo: id },
    select: { status: true },
  });
  if (!order) {
    return { success: false, message: "Error finding order" };
  }

  try {
    await prisma.order.update({
      where: { invoiceNo: id },
      data: { status: orderStatus.toUpperCase() as OrderStatus },
    });
    revalidatePath("/orders");
    return { success: true, message: "Order status updated!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error updating Order status" };
  }
}

export const getLast7DaysSales = async () => {
  const today = new Date();
  const last7Days = [];
  const todayMidnight = new Date(today);
  todayMidnight.setHours(0, 0, 0, 0);
  for (let i = 6; i >= 0; i--) {
    const date = new Date(todayMidnight);
    date.setDate(todayMidnight.getDate() - i);
    last7Days.push(date);
  }

  const salesData = await prisma.order.groupBy({
    by: ["orderTime"],
    _sum: { amount: true },
    _count: { id: true },
    where: {
      orderTime: {
        gte: last7Days[0], // Get data from the earliest date in our range
        lt: new Date(todayMidnight.getTime() + 24 * 60 * 60 * 1000),
      },
    },
  });

  // Process data to return the expected format
  const weeklySales: WeeklySalesData = last7Days.map((date) => {
    const formattedDate = format(date, "MMM dd"); // "Feb 12"

    const dayData = salesData.find(
      (sale) =>
        format(sale.orderTime, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );

    return {
      date: formattedDate,
      totalRevenue: dayData?._sum.amount || 0,
      totalOrders: dayData?._count.id || 0,
    };
  });

  return weeklySales;
};

export async function getLastMonthOrders() {
  const now = new Date();

  // Get the first day of last month
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  startOfLastMonth.setHours(0, 0, 0, 0); // Set time to midnight

  // Get the last day of last month
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  endOfLastMonth.setHours(23, 59, 59, 999); // Set time to end of the day
  const lastMonthOrders = await prisma.order.findMany({
    select: {
      id: true,
      orderTime: true,
      amount: true,
    },
    where: {
      orderTime: {
        gte: startOfLastMonth, // Start of last month
        lte: endOfLastMonth, // End of last month
      },
    },
  });
  return lastMonthOrders;
}
export async function getThisMonthOrders() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1); // Set to the first day of the month
  startOfMonth.setHours(0, 0, 0, 0);
  const thisMonthOrders = await prisma.order.findMany({
    select: {
      id: true,
      orderTime: true,
      amount: true,
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    where: {
      orderTime: {
        gte: startOfMonth,
      },
    },
  });
  return thisMonthOrders;
}
