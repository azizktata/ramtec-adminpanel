"use client";
import { addProduct, updateProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Typography from "@/components/ui/typography";
import { ProductALL } from "@/types/products-IncludeAll";
import { Loader2, ShieldAlert } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
}

export default function ProductForm({
  action,
  product = {
    id: "",
    name: "",
    description: "",
    published: false,
    stock: 0,
    sales: 0,
    sku: "",
    status: "SELLING", // or any default status
    slug: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    prices: null,
    category: [],
    images: [],
  },
}: {
  action: "add" | "update";
  product?: ProductALL;
}) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  async function handleSubmit(formData: FormData) {
    if (action === "add") {
      const res = await addProduct(formData);
      if (res) {
        if (res?.success) {
          toast.success(res.message);
        } else {
          toast.error(res!.message);
        }
      }
    } else if (action === "update") {
      formData.append("id", product.id);
      const res = await updateProduct(formData);
      if (res) {
        if (res?.success) {
          toast.success(res.message);
        } else {
          toast.error(res!.message);
        }
      }
    }
  }
  return (
    <form className="flex flex-col gap-2 p-2" action={handleSubmit}>
      <div className="">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          name="name"
          defaultValue={product.name}
          id="name"
          className="block border"
        />
      </div>

      <div className="">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          defaultValue={product.prices?.price}
          name="price"
          id="price"
          className="block border"
        />
        <Label htmlFor="price">Discount</Label>
        <Input
          type="number"
          defaultValue={product.prices?.discount}
          name="discount"
          id="price"
          className="block border"
        />
      </div>
      <div className="">
        <Label htmlFor="sku">SKU</Label>
        <Input
          type="text"
          name="sku"
          defaultValue={product.sku}
          id="sku"
          className="block border"
        />
      </div>
      <div className="">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          type="number"
          name="quantity"
          id="quantity"
          defaultValue={product.stock}
          className="block border"
        />
      </div>
      <div className="">
        {product.images.length > 0 ? (
          // If there are images, display them with an "Edit Image" button
          <>
            {product.images.map((image, index) => (
              <div key={index} className="mb-4">
                <Image
                  src={image.url}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="size-8 rounded-sm"
                />
                <label
                  htmlFor={`image-${index}`}
                  className="block font-semibold text-sm mb-2"
                >
                  Edit Image
                </label>
                <input
                  id={`image-${index}`}
                  className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  type="file"
                  name={`image-${index}`}
                />
              </div>
            ))}

            {/* Add image button */}
            <div className="mt-4">
              <label
                htmlFor="add-image"
                className="block font-semibold text-sm mb-2"
              >
                Add Another Image
              </label>
              <input
                id="add-image"
                className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type="file"
                name="image"
              />
            </div>
          </>
        ) : (
          // If no images, show "Add Image" button
          <>
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
          </>
        )}
      </div>

      <div className="">
        <Label htmlFor="description">Description</Label>
        <textarea
          name="description"
          id="description"
          className="block border"
          defaultValue={product.description}
        ></textarea>
      </div>
      {/* {categories.length > 0 && (
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
      )} */}
      {loading ? (
        <div className="flex flex-col gap-2 items-center px-2 py-6">
          <Loader2 className="size-4 animate-spin" />
          <Typography>Loading...</Typography>
        </div>
      ) : error || !categories ? (
        <div className="flex flex-col gap-2 items-center px-2 py-6 max-w-full">
          <ShieldAlert className="size-6" />
          <Typography>
            Sorry, something went wrong while fetching categories
          </Typography>
        </div>
      ) : (
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
                defaultChecked={product.category.some(
                  (c) => c.id === category.id
                )}
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
