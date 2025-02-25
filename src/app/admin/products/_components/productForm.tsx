"use client";
import { addProduct, deleteImage, updateProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductALL } from "@/types/products-IncludeAll";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";
import toast from "react-hot-toast";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useFormStatus } from "react-dom";
import { CategoryWithProductsIds } from "@/types/category-with-products";

interface Marque {
  id: string;
  name: string;
}

export default function ProductForm({
  action,
  product = {
    id: "",
    name: "",
    marque: {
      id: "",
      name: "",
    },
    marqueId: "",
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
  const { pending } = useFormStatus();
  const [categories, setCategories] = React.useState<CategoryWithProductsIds[]>(
    []
  );
  const [marques, setMarques] = React.useState<Marque[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    product.category.map((c) => c.id)
  );
  const [selectedMarque, setSelectedMarque] = React.useState<string>(
    product.marque.id
  );
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) // Remove if already selected
          : [...prev, categoryId] // Add if not selected
    );
  };
  React.useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");

      const data = await response.json();
      setCategories(data);
      // setLoading(false);
    }
    async function fetchMarques() {
      const response = await fetch("/api/marques");
      if (!response.ok) throw new Error("Failed to fetch marques");

      const data = await response.json();
      setMarques(data);
    }
    fetchMarques();
    fetchCategories();
  }, []);

  async function handleSubmit(formData: FormData) {
    selectedCategories.forEach((categoryId) => {
      formData.append("categories", categoryId); // Append each category separately
    });
    formData.append("marque", selectedMarque);
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
  async function handleDeleteImage(id: string) {
    const res = await deleteImage(id);

    if (res?.success) {
      toast.success(res.message);
    } else {
      toast.error(res!.message);
    }
  }
  return (
    <form className="flex flex-col gap-2 p-2" action={handleSubmit}>
      <div className="flex gap-2">
        <div className="flex-grow">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            defaultValue={product.name}
            id="name"
            className="block border"
          />
        </div>
        <div className="flex-grow">
          <Label htmlFor="sku">SKU</Label>
          <Input
            type="text"
            name="sku"
            defaultValue={
              product.sku || `PROD_${Math.floor(10000 + Math.random() * 90000)}`
            }
            id="sku"
            className="block border"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-grow">
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            defaultValue={product.prices?.price}
            name="price"
            id="price"
            className="block border"
          />
        </div>
        <div className="flex-grow">
          <Label htmlFor="price">Discount</Label>
          <Input
            type="number"
            defaultValue={product.prices?.discount || 0}
            name="discount"
            id="price"
            className="block border"
          />
        </div>
        <div className="flex-grow">
          <Label htmlFor="price">Discount Seller</Label>
          <Input
            type="number"
            defaultValue={product.prices?.discountSeller || 0}
            name="discountSeller"
            id="price"
            className="block border"
          />
        </div>
      </div>
      <div className="">
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          name="description"
          id="description"
          className="block border"
          defaultValue={product.description}
        ></Input>
      </div>
      <div className="flex gap-2">
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
        <div className="flex-grow">
          <Label htmlFor="quantity">Marques</Label>
          <Select
            onValueChange={(value) => setSelectedMarque(value)}
            value={selectedMarque}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select from Marques" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2  space-y-1">
                {marques.map((marque) => (
                  <SelectItem key={marque.id} value={marque.id}>
                    {marque.name}
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-8 my-4">
        {/* <div className="space-y-4 ">
          <h3>Select Existing Categories</h3>

          {categories.map((category) => (
            <div className="flex items-center gap-2" key={category.id}>
              <Label htmlFor={category.id} className="ml-2">
                {category.name}
              </Label>
              <Checkbox
                name="categories"
                value={category.id}
                defaultChecked={product.category.some(
                  (c) => c.id === category.id
                )}
                id={category.id}
              />
            </div>
          ))}
        </div> */}
        <div className="flex-grow">
          <Label htmlFor="categories">Categories</Label>
          <Select>
            <SelectTrigger>
              <p className="w-full flex justify-between">
                {selectedCategories.length > 0
                  ? `${selectedCategories.length} categories selected`
                  : "Select categories"}
              </p>
            </SelectTrigger>
            <SelectContent>
              <div className="p-2 space-y-1">
                {categories.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No categories available
                  </p>
                ) : (
                  categories
                    .filter((cat) => !cat.parentId) // Get only parent categories
                    .map((parent) => {
                      // Find children of this parent
                      const subcategories = categories.filter(
                        (c) => c.parentId === parent.id
                      );
                      console.log("categories: " + categories);
                      console.log(
                        `Parent: ${parent.name}, Subcategories:`,
                        subcategories
                      );

                      return (
                        <div key={parent.id}>
                          {/* Parent Category */}
                          <div className="flex items-center gap-2 px-2 py-1">
                            <Label
                              htmlFor={parent.id}
                              className="font-semibold"
                            >
                              {parent.name}
                            </Label>
                          </div>

                          {/* Child Categories */}
                          {subcategories.length > 0 ? (
                            subcategories.map((child) => (
                              <div
                                key={child.id}
                                className="flex items-center gap-2 pl-4 py-1"
                              >
                                <Checkbox
                                  id={child.id}
                                  checked={selectedCategories.includes(
                                    child.id
                                  )}
                                  onCheckedChange={() =>
                                    toggleCategory(child.id)
                                  }
                                />
                                <Label htmlFor={child.id}>{child.name}</Label>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-xs pl-4">
                              No subcategories
                            </p>
                          )}
                        </div>
                      );
                    })
                )}
              </div>
            </SelectContent>
          </Select>
        </div>

        {/* {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center gap-2 px-2 py-1"
                  >
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <Label htmlFor={category.id}>{category.name}</Label>
                  </div>
                ))} */}
        <div className="flex-grow  ">
          <Label htmlFor="newCategory" className="text-sm font-light">
            Or Add New Category
          </Label>
          <Input
            type="text"
            name="newCategory"
            id="newCategory"
            className="block border"
          />
        </div>
      </div>
      <div className="">
        {product.images.length > 0 ? (
          // If there are images, display them with an "Edit Image" button
          <>
            {product.images.map((image, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center gap-2 mt-2">
                  <Image
                    src={image.url}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="size-16 rounded-sm"
                  />

                  <Button
                    variant="ghost"
                    onClick={() => handleDeleteImage(image.id)}
                    type="button"
                  >
                    <Trash2Icon className="size-4 text-red-500 cursor-pointer" />
                  </Button>
                </div>
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
              <Input
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

      <div className="flex  mt-4">
        <Suspense>
          <Button
            disabled={pending}
            onClick={() => {
              const closeButton = document
                .querySelector(".lucide-x")
                ?.closest("button") as HTMLButtonElement;
              closeButton?.click(); // Trigger the close action
            }}
            type="submit"
          >
            {pending ? "loading..." : "Submit"}
          </Button>
        </Suspense>
        {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add Product
        </button> */}
      </div>
    </form>
  );
}
