"use server"

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";


import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function addProduct(formData: FormData) {
   
    try {
      const name = formData.get('name') as string;
      const slug = name.toLowerCase().replace(/\s+/g, '-')
      const price = Number(formData.get('price'));
      const stock = Number(formData.get('quantity'));
      const description = formData.get('description') as string;
      const newCategory = formData.get('newCategory') as string;
      const selectedCategories = formData.getAll('categories') as string[];
      
      const categoryIds = [...selectedCategories];
      if (newCategory) {
        const createdCategory = await prisma.category.create({
          data: { name: newCategory, slug: newCategory.toLowerCase().replace(/\s+/g, '-') ,published: true,},
        });
        categoryIds.push(createdCategory.id);
      }
      
      
      const file = formData.get('image') as File;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
  
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
         
          upload_preset: 'ml_default'
        }, function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result );
        })
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
              discount: 0,
            },
          },
          stock,
          status: "SELLING",
          sku: "PROD_" + sku,
          description,
          published: true,
          images: {
            create: [{
              url: (result as { secure_url: string }).secure_url,
            },]
          },
          category: {
            connect: categoryIds.map((id) => ({ id })),
          },
        },
      });
      if (res) {
        revalidatePath('/products');
        return { success: true, message: 'Product added successfully!' };
      }
    } catch  {
      // console.error(error);
      return { success: false, message: `Error adding product ` };
      
    }
  
   
  }
  
  
//   export async function updateProduct(formData: FormData) {
//     const { isAuthenticated, getPermission } = await getKindeServerSession();
  
//     if (!(await isAuthenticated())) {
//       return redirect("/");
//     }
//     const requieredPermission = await getPermission("admin");
//     if (!requieredPermission?.isGranted) {
//       return redirect("/");
//     }
//     try {
//       const name = formData.get('name') as string;
//       const slug = name.toLowerCase().replace(/\s+/g, '-')
//         const price = Number(formData.get('price'));
//       const inventory = Number(formData.get('quantity'));
//       const description = formData.get('description') as string;
//       const newCategory = formData.get('newCategory') as string;
//       const selectedCategories = formData.getAll('categories') as string[];
    
//       const categoryIds = [...selectedCategories];
    
//       // Create a new category if provided
//       if (newCategory) {
//         const createdCategory = await prisma.category.create({
//           data: { name: newCategory, slug: newCategory.toLowerCase().replace(/\s+/g, '-') },
//         });
//         categoryIds.push(createdCategory.id);
//       }
//       const imageUrl = formData.get('image') as string 
//       const product = await prisma.product.findFirst({
//         where: { id: formData.get('id') as string },
//         select: { images: { select: { id: true } }}
//       });
//       if(!product){
//         return { success: false, message: 'Error updating product' };
//       }
      
//       const savedImage = await prisma.image.update({
//         where: {id: product.images[0].id},
//         data: { url: imageUrl },
//       });
//       // Create the product with associated categories
//       const res = await prisma.product.update({
//         where: { id: formData.get('id') as string },
//         data: {
//           name,
//           slug,
//           price,
//           inventory,
//           description,
//           images: {
//             connect: { id: savedImage.id },
//           },
//           categories: {
//             connect: categoryIds.map((id) => ({ id })),
//           },
//         },
//       });
//       if (res) {
//         revalidatePath('/admin/inventory');
//         return { success: true, message: 'Product updated successfully!' };
//       }
//     } catch  {
//       return { success: false, message: 'Error updating product' };
      
//     }
  
//     // Revalidate the products page to show the updated data
   
//   }
//   export async function deleteProduct(id:string) {
//     const { isAuthenticated, getPermission } = await getKindeServerSession();
  
//     if (!(await isAuthenticated())) {
//       return redirect("/");
//     }
//     const requieredPermission = await getPermission("admin");
//     if (!requieredPermission?.isGranted) {
//       return redirect("/");
//     }
//     const product = await prisma.product.findFirst({
//       where: { id: id },
//       select: { images: { select: { id: true } }}
//     });
//     if(!product){
//       return { success: false, message: 'Error updating product' };
//     }
//     try {
//       if(product.images.length > 0)
//     {
//       await prisma.image.delete({
//         where: { id: product.images[0].id },
//       });
  
//     }
//       await prisma.product.delete({
//         where: { id },
//       });
//       revalidatePath('/admin/inventory');
//       return { success: true, message: 'Product deleted successfully!' };
//     } catch  {
//       return { success: false, message: 'Error deleting product' };
//     }
//   }