"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function updateMarque(formData: FormData) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/sign-in");
    const marqueName = formData.get("name") as string;
    const id = formData.get("id") as string;
    const marque = await prisma.marque.findFirst({
      where: { id: id },
      include: { image: true },
    });
    if (!marque) {
      return { success: false, message: "Error finding marque" };
    }
    const file = formData.get("image") as File;
    let imageId = marque.image?.id;
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              upload_preset: "ml_default",
            },
            function (error, result) {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            }
          )
          .end(buffer);
      });

      if (!result) {
        return { success: false, message: "Error uploading image" };
      }
      const imageUrl = marque.image?.url.split("/").pop()?.split(".")[0]; // Extract image ID from the URL
      if (imageUrl) {
        await cloudinary.uploader.destroy(imageUrl);
      }

      const savedImage = await prisma.image.update({
        where: { id: marque.image?.id },
        data: { url: (result as { secure_url: string }).secure_url },
      });
      if (!savedImage) {
        return { success: false, message: "Error updating image" };
      }
      imageId = savedImage.id;
    }
    try {
      await prisma.marque.update({
        where: { id: id },
        data: {
          name: marqueName,
          image: {
            connect: {
              id: imageId,
            },
          },
        },
      });
      revalidatePath("/marques");
      return { success: true, message: "Marque updated" };
    } catch {
      return { success: false, message: "Error updating Marque" };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function addMarque(formData: FormData) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/sign-in");
    const marqueName = formData.get("name") as string;
    const file = formData.get("image") as File;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            upload_preset: "ml_default",
          },
          function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        )
        .end(buffer);
    });
    try {
      await prisma.marque.create({
        data: {
          name: marqueName,
          image: {
            create: {
              url: (result as { secure_url: string }).secure_url,
            },
          },
        },
      });
      revalidatePath("/marques");
      return { success: true, message: "new Marque added" };
    } catch {
      return { success: false, message: "Error adding new marque" };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteMarque(id: string) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") redirect("/sign-in");
    const marque = await prisma.marque.findFirst({
      where: { id: id },
      include: { image: true },
    });
    if (!marque) {
      return { success: false, message: "Error finding marque" };
    }
    try {
      const imageUrl = marque.image?.url.split("/").pop()?.split(".")[0]; // Extract image ID from the URL
      if (imageUrl) {
        await Promise.all([
          await prisma.marque.delete({
            where: { id: id },
          }),

          await cloudinary.uploader.destroy(imageUrl),
        ]);
      }
      revalidatePath("/marques");
      return { success: true, message: "marque deleted" };
    } catch {
      return { success: false, message: "Error deleting marque" };
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
