"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { saltAndHashPassword, verifyPassword } from "@/utils/passwordEncoder";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "name cannot be blank"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  phone: z.number().min(8, "Enter valid phone number"),
  address: z.string().min(3, "Address cannot be blank"),
});
const loggingSchema = z.object({
  name: z.string().min(3, "name cannot be blank"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export async function addUser(formData: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/sign-in");
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const role = formData.get("role") as Role;
    const password = formData.get("password") as string;

    const validation = schema.safeParse({
      name,
      email,
      phone: parseInt(phone),
      address,
      password,
    });
    if (!validation.success) {
      return { success: false, message: validation.error.errors[0].message };
    }
    const pwHash = await saltAndHashPassword(password);
    const res = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        address,
        role,
        password: pwHash,
      },
    });

    if (res) {
      revalidatePath("/users");
      return { success: true, message: "User account added successfully!" };
    }
  } catch {
    return { success: false, message: `Error adding User account` };
  }
}

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    const password = formData.get("password") as string;

    const validation = loggingSchema.safeParse({
      email,
      name,
      password,
    });

    if (!validation.success) {
      return { success: false, message: validation.error.errors[0].message };
    }
    const foundUser = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (foundUser) {
      return { success: false, message: `Email already exists` };
    }
    const pwHash = await saltAndHashPassword(password);
    const res = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        role: Role.CUSTOMER,
        password: pwHash,
      },
    });

    if (res) {
      // revalidatePath("/");
      return { success: true, message: "Account added successfully!" };
    }
  } catch {
    return { success: false, message: `Error creating new account` };
  }
}

export async function removeUser(id: string) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/sign-in");
  try {
    const customer = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!customer) {
      return { success: false, message: `user account not found` };
    }
    const res = await prisma.user.delete({
      where: {
        id,
      },
    });
    if (res) {
      revalidatePath("/users");
      return {
        success: true,
        message: "User account removed successfully!",
      };
    }
  } catch {
    return { success: false, message: `Error removing user account` };
  }
}

export async function updateUser(formData: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/sign-in");
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const role = formData.get("role") as Role;
    const id = formData.get("id") as string;

    const customer = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!customer) {
      return { success: false, message: `User account not found` };
    }
    const res = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
        address,
        role,
      },
    });
    if (res) {
      revalidatePath("/users");
      return {
        success: true,
        message: "User account updated successfully!",
      };
    }
  } catch {
    return { success: false, message: `Error updating User account` };
  }
}
export async function getUserFromDb(email: string, password: string) {
  try {
    const user = await prisma.user.findFirst({
      omit: {
        password: false, // The password field is now selected.
      },
      where: {
        email: email,
      },
    });
    if (!user) {
      return null;
    }
    if (!user.password) {
      throw new Error("Invalid credentials");
    }
    const isPasswordCorrect = await verifyPassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch {
    return null;
  }
}
