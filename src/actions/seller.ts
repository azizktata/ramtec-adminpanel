"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addSeller(formData:FormData){
    try {

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const address = formData.get("address") as string;

    const res = await prisma.seller.create({
        data: {
            name,
            email,
            phone,
            address
        }
    });
    if (res) {
        revalidatePath("/sellers");
        return { success: true, message: "seller account added successfully!" };
    }
} catch {
    return {success : false, message: `Error adding seller account`};
}
}

export async function removeSeller(id:string){
    try {
        const seller = await prisma.seller.findFirst({
            where: {
                id
            }
        })
        if(!seller){
            return {success: false, message: `seller account not found`};
        }
        const res = await prisma.seller.delete({
            where: {
                id
            }
        });
        if(res){
            revalidatePath("/sellers");
            return {success: true, message: "seller account removed successfully!"};
        }
    } catch {
        return {success: false, message: `Error removing seller account`};
    }
}

export async function updateSeller(formData:FormData){
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const address = formData.get("address") as string;
        const id = formData.get("id") as string;

        const seller = await prisma.seller.findFirst({
            where: {
                id
            }
        })
        if(!seller){
            return { success: false, message: `seller account not found`};
        }
        const res = await prisma.seller.update({
            where: {
                id
            },
            data: {
                name,
                email,
                phone,
                address
            }
        });
        if(res){
            revalidatePath("/sellers");
            return {success: true, message: "seller account updated successfully!"};
        }
    } catch {
        return {success: false, message: `Error updating seller account`};
    }
}