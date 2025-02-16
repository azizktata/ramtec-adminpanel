"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "name cannot be blank"),
  email: z.string().email("enter valid email").min(1, "Email cannot be blank"),
  phone: z.number().min(8, "Enter valid phone number"),
  address: z.string().min(3, "Address cannot be blank"),
});

export async function addCustomer(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    const validation = schema.safeParse({
      name,
      email,
      phone,
      address,
    });
    if (!validation.success) {
      return { success: false, message: validation.error.errors[0].message };
    }
    const res = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address,
      },
    });
    if (res) {
      revalidatePath("/customers");
      return { success: true, message: "Customer account added successfully!" };
    }
  } catch {
    return { success: false, message: `Error adding customer account` };
  }
}

export async function removeCustomer(id: string) {
  try {
    const customer = await prisma.customer.findFirst({
      where: {
        id,
      },
    });
    if (!customer) {
      return { success: false, message: `Customer account not found` };
    }
    const res = await prisma.customer.delete({
      where: {
        id,
      },
    });
    if (res) {
      revalidatePath("/customers");
      return {
        success: true,
        message: "Customer account removed successfully!",
      };
    }
  } catch {
    return { success: false, message: `Error removing customer account` };
  }
}

export async function updateCustomer(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const id = formData.get("id") as string;

    const customer = await prisma.customer.findFirst({
      where: {
        id,
      },
    });
    if (!customer) {
      return { success: false, message: `Customer account not found` };
    }
    const res = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
        address,
      },
    });
    if (res) {
      revalidatePath("/customers");
      return {
        success: true,
        message: "Customer account updated successfully!",
      };
    }
  } catch {
    return { success: false, message: `Error updating customer account` };
  }
}
