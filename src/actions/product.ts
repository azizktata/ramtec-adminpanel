"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

import { v2 as cloudinary } from "cloudinary";
import { BestProductSellers,  } from "@/app/admin/dashboard/_types/BestSellers";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function addProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("quantity"));
    const description = formData.get("description") as string;
    const discount = Number(formData.get("discount")) || 0;
  
    const newCategory = formData.get("newCategory") as string;
    const selectedCategories = formData.getAll("categories") as string[];

    const categoryIds = [...selectedCategories];
    // if (newCategory) {
    //   const createdCategory = await prisma.category.create({
    //     data: {
    //       name: newCategory,
    //       slug: newCategory.toLowerCase().replace(/\s+/g, "-"),
    //       published: true,
    //     },
    //   });
    //   categoryIds.push(createdCategory.id);
    // }

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

    const sku = Math.floor(10000 + Math.random() * 90000);

    const res = await prisma.product.create({
      data: {
        name,
        slug,
        prices: {
          create: {
            price,
            discount
          },
        },
        stock,
        status: "SELLING",
        sku: "PROD_" + sku,
        description,
        published: true,
        images: {
          create: [
            {
              url: (result as { secure_url: string }).secure_url,
              
            },
          ],
        },
        category: {
          connect: categoryIds.map((id) => ({ id })),
          create: newCategory ? {
            name: newCategory,
            slug: newCategory.toLowerCase().replace(/\s+/g, "-"),
            published: true
          } : undefined
        },
      },
    });
    if (res) {
      revalidatePath("/products");
      return { success: true, message: "Product added successfully!" };
    }
  } catch {
    // console.error(error);
    return { success: false, message: `Error adding product ` };
  }
}

export async function updateProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("quantity"));
    const discount = Number(formData.get("discount"));
    const sku = formData.get("sku") as string;
    const description = formData.get("description") as string;
    const newCategory = formData.get("newCategory") as string;
    const selectedCategories = formData.getAll("categories") as string[];
    const productId = formData.get("id") as string;
    const categoryIds = [...selectedCategories];
    if (newCategory) {
      const createdCategory = await prisma.category.create({
        data: {
          name: newCategory,
          slug: newCategory.toLowerCase().replace(/\s+/g, "-"),
          published: true,
        },
      });
      categoryIds.push(createdCategory.id);
    }

    const savedImages = [];
    const product = await prisma.product.findFirst({
      where: { id: productId },
      select: { images: { select: { id: true } } },
    });

    if (!product) {
      return { success: false, message: "Error updating product" };
    }

    const image = formData.get("image") as File;
    // add new image
    if (image.size > 0) {
      const arrayBuffer = await image.arrayBuffer();
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
      if (result) {
        const savedImage = await prisma.image.create({
          data: {
            url: (result as { secure_url: string }).secure_url,
            productId: productId,
          },
        });
        savedImages.push(savedImage.id);
      }
    }

    // update existing images
    const existingImages = [];

    for (let i = 0; i < product.images.length; i++) {
      const file = formData.get(`image-${i}`) as File;

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

        if (result) {
          // if he wants to update an existing image
          const savedImage = await prisma.image.update({
            where: { id: product.images[i].id },
            data: { url: (result as { secure_url: string }).secure_url },
          });
          existingImages.push(savedImage.id);
        }
      }
    }

    // Add the new and updated images
    const allImageIds = [...savedImages, ...existingImages];

    const res = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        slug,
        prices: {
          update: {
            price,
            discount,
          },
        },
        stock,
        status: "SELLING",
        sku,
        description,
        published: true,
        images: {
          connect: allImageIds.map((id) => ({ id })),
        },
        category: {
          connect: categoryIds.map((id) => ({ id })),
        },
      },
    });
    if (res) {
      revalidatePath("/products");
      return { success: true, message: "Product updated successfully!" };
    }
  } catch  {

    return { success: false, message: "Error updating product" };
  }
}
export async function deleteProduct(id:string) {
  const product = await prisma.product.findFirst({
    where: { id: id },
    select: { images: { select: { id: true, url:true } }}
  });
  if(!product){
    return { success: false, message: 'Error finding product' };
  }
  try {
    for (const image of product.images) {
      console.log(image.url);
      const imageUrl = image.url.split('/').pop()?.split('.')[0]; // Extract image ID from the URL
      if (imageUrl) {
        await cloudinary.uploader.destroy(imageUrl); // Deleting image from Cloudinary
      }
    }
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath('/products');
    return { success: true, message: 'Product deleted successfully!' };
  } catch  {
    return { success: false, message: 'Error deleting product' };
  }
}

export async function deleteImage(id:string){
  const image = await prisma.image.findFirst({
    where: { id: id },
    select: { url: true }
  });
  if (!image || !image.url) {
    return { success: false, message: "Error finding image" };
  }
  try {
    const imageUrl = image.url.split('/').pop()?.split('.')[0]; // Extract image ID from the URL
    if (!imageUrl) {
      return { success: false, message: "Invalid image URL" };
    }


      await cloudinary.uploader.destroy(imageUrl); // Deleting image from Cloudinary

    await prisma.image.delete({
      where: { id },
    });
    revalidatePath('/products');
    return { success: true, message: 'Image deleted successfully!' };
  } catch  {
    return { success: false, message: 'Error deleting image' };
  }
}

export async function updateStatus(id:string) {
  const product = await prisma.product.findFirst({
    where: { id: id },
    select: { status: true }
  });
  if(!product){
    return { success: false, message: 'Error finding product' };
  }
  try {
    const status = product.status === 'SELLING' ? 'OUT_OF_STOCK' : 'SELLING';
    await prisma.product.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/products');
    return { success: true, message: 'Product status updated!' };
  } catch  {
    return { success: false, message: 'Error updating product status' };
  }
}

export async function updatePublisherStatus(id: string){
  const product = await prisma.product.findFirst({
    where: { id: id },
    select: { published: true }
  });
  if(!product){
    return { success: false, message: 'Error finding product' };
  }
  try {
    const published = !product.published;
    await prisma.product.update({
      where: { id },
      data: { published },
    });
    revalidatePath('/products');
    return { success: true, message: 'Product status updated!' };
  } catch  {
    return { success: false, message: 'Error updating product status' };
  }
}
export async function getBestSellingProducts(){
  const top5BestSellers = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: { quantity: true }, // Get total quantity sold per product
    orderBy: {
      _sum: { quantity: "desc" }, // Order by highest sales
    },
    take: 5, // Limit to top 5
  });
  
  const bestSellingProducts = await prisma.product.findMany({
    where: {
      id: { in: top5BestSellers.map((item) => item.productId) },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      
    },
  });

  return bestSellingProducts.map((product) => {
    return {
      name: product.name,
      sales: top5BestSellers.find((item) => item.productId === product.id)?._sum.quantity || 0,
    } ;
  })as BestProductSellers;
  
  
}