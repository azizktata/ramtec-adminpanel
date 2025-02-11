"use server"

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Asul } from "next/font/google";

export async function updateCategory(formData:FormData){
    const categoryName = formData.get('name') as string;
    const description = formData.get('description') as string;
    const id = formData.get('id') as string;
    const category = await prisma.category.findFirst({
        where: { id: id },
    })
    if(!category){
        return { success: false, message: 'Error finding category' };
    }
    try {
        await prisma.category.update({
            where: { id: id },
            data: {
                name: categoryName,
                description: description,
            },
        });
        revalidatePath('/categories');
        return { success: true, message: 'Category updated' };
    } catch  {
        return { success: false, message: 'Error updating category' };
    }
}

export async function addCategory(formData:FormData){
    const categoryName = formData.get('name') as string;
    const description = formData.get('description') as string;
    const slug = categoryName.toLowerCase().replace(/\s+/g, "-");
    try {
        await prisma.category.create({
            data: {
                name: categoryName,
                slug,
                description: description,
                published: true
            },
        });
        revalidatePath('/categories');
        return { success: true, message: 'Category added' };
    } catch  {
        return { success: false, message: 'Error adding category' };
    }
}

export async function deleteCategory(id:string){
    const category = await prisma.category.findFirst({
        where: { id: id },
    });
    if(!category){
        return { success: false, message: 'Error finding category' };
    }
    try {
        await prisma.category.delete({
            where: { id: id },
        });
        revalidatePath('/categories');
        return { success: true, message: 'Category deleted' };
    } catch  {
        return { success: false, message: 'Error deleting category' };
    }
}