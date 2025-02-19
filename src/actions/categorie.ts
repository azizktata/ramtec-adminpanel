"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCategory(formData: FormData) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/sign-in");
    const categoryName = formData.get("name") as string;
    const description = formData.get("description") as string;
    const id = formData.get("id") as string;
    const category = await prisma.category.findFirst({
      where: { id: id },
    });
    if (!category) {
      return { success: false, message: "Error finding category" };
    }
    try {
      await prisma.category.update({
        where: { id: id },
        data: {
          name: categoryName,
          description: description,
        },
      });
      revalidatePath("/categories");
      return { success: true, message: "Category updated" };
    } catch {
      return { success: false, message: "Error updating category" };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function addCategory(formData: FormData) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/sign-in");
    const categoryName = formData.get("name") as string;
    const description = formData.get("description") as string;
    const slug = categoryName.toLowerCase().replace(/\s+/g, "-");
    try {
      await prisma.category.create({
        data: {
          name: categoryName,
          slug,
          description: description,
          published: true,
        },
      });
      revalidatePath("/categories");
      return { success: true, message: "Category added" };
    } catch {
      return { success: false, message: "Error adding category" };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCategory(id: string) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/sign-in");
    const category = await prisma.category.findFirst({
      where: { id: id },
    });
    if (!category) {
      return { success: false, message: "Error finding category" };
    }
    try {
      await prisma.category.delete({
        where: { id: id },
      });
      revalidatePath("/categories");
      return { success: true, message: "Category deleted" };
    } catch {
      return { success: false, message: "Error deleting category" };
    }
  } catch (error) {
    console.error(error);
  }
}

// export async function getCategories() {
//   return await prisma.category.findMany({
//     include: {
//       products: {
//         select: {
//           id: true,
//           name: true,
//           description: true,
//         },
//       },
//     },
//   });
// }
