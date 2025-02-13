"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { addCategory } from "@/actions/categorie";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function CategoryActions() {
  async function handleSubmit(formData: FormData) {
    const res = await addCategory(formData);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }
  return (
    <div>
      {" "}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="default"
            size="lg"
            className="sm:flex-grow xl:flex-grow-0"
          >
            <Plus className="mr-2 size-4" /> Add Category
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add new category</SheetTitle>
            <SheetDescription>
              Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <form action={handleSubmit} className="flex flex-col gap-4 my-4 py-4">
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="name" className="text-right">
                Nom de categorie
              </Label>
              <Input id="name" name="name" />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                className="col-span-3"
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
