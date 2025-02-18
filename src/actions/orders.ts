"use server";

import prisma from "@/lib/db";
import { OrderStatus, ProductStatus, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";
import { WeeklySalesData } from "@/app/admin/dashboard/_types/WeeklySales";
import { Item } from "@/types/products-IncludeAll";

async function generateInvoiceNo() {
  // Find the latest order based on createdAt
  const lastOrder = await prisma.order.findFirst({
    orderBy: { orderTime: "desc" },
    select: { invoiceNo: true },
  });

  let newInvoiceNo = "INV-0001"; // Default for first invoice

  if (lastOrder?.invoiceNo) {
    // Extract number and increment
    const lastNumber = parseInt(lastOrder.invoiceNo.split("-")[1], 10) || 0;
    const nextNumber = lastNumber + 1;
    newInvoiceNo = `INV-${String(nextNumber).padStart(4, "0")}`;
  }

  return newInvoiceNo;
}

import { z } from "zod";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const schema = z.object({
  firstName: z.string().min(3, "firstname cannot be blank"),
  lastName: z.string().min(3, "lastname cannot be blank"),
  email: z.string().email("enter valid email").min(1, "Email cannot be blank"),
  phone: z.number().min(8, "Enter valid phone number"),
  address: z.string().min(3, "Address cannot be blank"),
});

export async function createOrder(
  formData: FormData,
  total: number,
  items: Item[]
) {
  const formObj = Object.fromEntries(formData.entries());
  const session = await auth();
  if (session?.user.role === "SELLER") redirect("/sign-in");
  const { firstName, lastName, email, phone, address } = formObj as {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  if (items.length === 0) {
    return { success: false, message: "No items in cart" };
  }
  const validation = schema.safeParse({
    firstName,
    lastName,
    email,
    phone: parseInt(phone),
    address,
  });
  if (!validation.success) {
    return { success: false, message: validation.error.errors[0].message };
  }
  const customer = await prisma.user.findFirst({
    where: {
      email,
      role: Role.CUSTOMER,
    },
  });

  const isAvailable = (
    await Promise.all(
      items.map(async (item) => {
        const product = await prisma.product.findFirst({
          where: {
            AND: [
              { id: item.id },
              { stock: { gte: item.quantity || 1 } },
              { status: "SELLING" },
            ],
          },
        });
        return product !== null; // Ensure we return true/false
      })
    )
  ).every(Boolean);
  if (!isAvailable) {
    return { success: false, message: "Some products are out of stock" };
  }

  const invoiceNo = await generateInvoiceNo();
  try {
    await prisma.order.create({
      data: {
        user: customer
          ? { connect: { id: customer.id } }
          : {
              create: {
                name: `${firstName} ${lastName}`,
                email,
                phone,
                address,
              },
            },

        amount: total,
        status: "PENDING",
        method: "CASH",
        address,
        invoiceNo,
        items: {
          create: items.map((item) => ({
            product: { connect: { id: item.id } },
            quantity: item.quantity || 1,
            price: item.prices?.price || 0,
          })),
        },
      },
    });
    await Promise.all(
      items.map((item) =>
        prisma.product.update({
          where: { id: item.id },
          data: {
            stock: { decrement: item.quantity || 1 },
            status:
              item.quantity === item.stock
                ? ProductStatus.OUT_OF_STOCK
                : ProductStatus.SELLING,
          },
        })
      )
    );
    revalidatePath("/checkout");
    return { success: true, message: "Order created successfully" };
  } catch {
    return { success: false, message: "Error creating order" };
  }
}

export async function updateOrderStatus(id: string, orderStatus: OrderStatus) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/sign-in");
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

export async function deleteOrder(id: string) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/sign-in");
  try {
    await prisma.order.delete({
      where: { id },
    });
    revalidatePath("/orders");
    return { success: true, message: "Order deleted successfully" };
  } catch {
    // console.error(error);
    return { success: false, message: "Error deleting order" };
  }
}

export const getLast7DaysSales = async () => {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/sign-in");

  const today = new Date();
  const last7Days = [];
  const todayMidnight = new Date(today);
  todayMidnight.setHours(0, 0, 0, 0);
  for (let i = 7; i >= 0; i--) {
    const date = new Date(todayMidnight);
    date.setDate(todayMidnight.getDate() - i);
    last7Days.push(date);
  }

  const orders = await prisma.order.findMany({
    where: {
      orderTime: {
        gte: last7Days[0],
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    },
    select: {
      orderTime: true,
      amount: true,
      id: true,
    },
  });

  // Process data to return the expected format
  const weeklySales: WeeklySalesData = last7Days.map((date) => {
    const formattedDate = format(date, "MMM dd"); // "Feb 12"
    const ordersForDay = orders.filter(
      (order) => format(new Date(order.orderTime), "MMM dd") === formattedDate
    );

    return {
      date: formattedDate,
      totalRevenue: ordersForDay.reduce((sum, order) => sum + order.amount, 0),
      totalOrders: ordersForDay.length,
    };
  });

  return weeklySales;
};

export async function getLastMonthOrders() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/sign-in");

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
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/sign-in");

  const startOfMonth = new Date();
  startOfMonth.setDate(1); // Set to the first day of the month
  startOfMonth.setHours(0, 0, 0, 0);
  const thisMonthOrders = await prisma.order.findMany({
    select: {
      id: true,
      orderTime: true,
      amount: true,
      user: {
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
