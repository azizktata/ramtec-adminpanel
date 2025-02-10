"use client";
import { addProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: Category[];
}

export default function ProductForm({
  categories,
}: {
  categories: Category[];
}) {
  async function handleSubmit(formData: FormData) {
    const res = await addProduct(formData);
    if (res) {
      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res!.message);
      }
    }
  }
  return (
    <form className="flex flex-col gap-2 px-2" action={handleSubmit}>
      <div className="">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" id="name" className="block border" />
      </div>

      <div className="">
        <Label htmlFor="price">Price</Label>
        <Input type="number" name="price" id="price" className="block border" />
      </div>

      <div className="">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          type="number"
          name="quantity"
          id="quantity"
          className="block border"
        />
      </div>
      <div className="z-50">
        <label htmlFor="image" className="block font-semibold text-sm mb-2">
          Select an Image to Upload
        </label>
        <input
          id="image"
          className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="file"
          name="image"
          required
        />
        {/* <CldUploadWidget
          uploadPreset="ml_default"
          onSuccess={(result) => {
            console.log(result);
            // if (
            //   result.event === "success" &&
            //   typeof result.info === "object" &&
            //   "secure_url" in result.info
            // ) {
            //   console.log(result.info);
            //   console.log(result.info.secure_url);
            //   setImageUrl(result?.info!.secure_url);
            // }
          }}
          options={{
            // Force Cloudinary widget to appear above everything
            styles: {
              zIndex: 100,
            },
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => {
                open();
              }}
            >
              Upload Image
            </button>
          )}
        </CldUploadWidget> */}

        {/* {imageUrl && (
          <Image
            src={imageUrl}
            alt="Uploaded"
            className="mt-2 w-40"
            height={100}
            width={100}
          />
        )} */}
      </div>

      <div className="">
        <Label htmlFor="description">Description</Label>
        <textarea
          name="description"
          id="description"
          className="block border"
        ></textarea>
      </div>
      {categories.length > 0 && (
        <div className="space-y-2">
          <h3>Select Existing Categories</h3>
          {categories.map((category) => (
            <div className="flex items-center gap-2" key={category.id}>
              <Label htmlFor={category.id} className="ml-2">
                {category.name}
              </Label>
              <input
                type="checkbox"
                name="categories"
                value={category.id}
                id={category.id}
              />
            </div>
          ))}
        </div>
      )}

      <div className="m-4">
        <Label htmlFor="newCategory">Or Add New Category</Label>
        <Input
          type="text"
          name="newCategory"
          id="newCategory"
          className="block border"
        />
      </div>

      <div className="m-4">
        <Button type="submit">Save changes</Button>
        {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add Product
        </button> */}
      </div>
    </form>
  );
}
