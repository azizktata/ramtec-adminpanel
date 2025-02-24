"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
import { updateCategory } from "@/actions/categorie";

export default function CategoryForm({
  category,
}: {
  category?: CategoryWithProductsIds;
}) {
  const { pending } = useFormStatus();
  const [categories, setCategories] = React.useState<CategoryWithProductsIds[]>(
    []
  );

  React.useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");

      const data = await response.json();
      setCategories(data);
      // setLoading(false);
    }

    fetchCategories();
  }, []);

  async function handleSubmit(formData: FormData) {
    const res = await updateCategory(formData);
    if (res) {
      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res!.message);
      }
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 my-4 py-4">
      <input type="hidden" name="id" defaultValue={category?.id} />
      <div className="flex flex-col items-start gap-4">
        <Label htmlFor="name" className="text-right">
          Nom de categorie
        </Label>
        <Input id="name" name="name" defaultValue={category?.name || ""} />
      </div>
      <div className="flex flex-col items-start gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Input
          id="description"
          name="description"
          className="col-span-3"
          defaultValue={category?.description || ""}
        />
      </div>
      {categories && (
        <div className="flex flex-col items-start gap-2 w-full">
          <label className="font-medium">Parent Category (Optional)</label>
          <Select name="parentId" defaultValue={category?.parentId || "none"}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="z-50 max-h-60 overflow-auto">
              <SelectItem value="none">No Parent</SelectItem>
              {categories
                .filter((cat) => !cat.parentId)
                .map((parent) => (
                  <div key={parent.id}>
                    <SelectItem value={parent.id} className="font-semibold">
                      {parent.name}
                    </SelectItem>
                    {categories
                      .filter((cat) => cat.parentId === parent.id)
                      .map((subCat) => (
                        <SelectItem
                          key={subCat.id}
                          value={subCat.id}
                          className="pl-6"
                        >
                          ─ {subCat.name}
                        </SelectItem>
                      ))}
                  </div>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}

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
