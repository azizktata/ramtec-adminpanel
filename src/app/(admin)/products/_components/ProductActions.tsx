"use client";
import { Upload, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ProductForm from "./productForm";
import React from "react";

export default function ProductActions() {
  return (
    <Card className="mb-5">
      <div className="flex flex-col xl:flex-row xl:justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Upload className="mr-2 size-4" /> Export
          </Button>

          {/* <Button variant="outline">
            <Download className="mr-2 size-4" /> Import
          </Button> */}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Sheet modal={false}>
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="lg"
                className="sm:flex-grow xl:flex-grow-0"
              >
                <Plus className="mr-2 size-4" /> Add Product
              </Button>
            </SheetTrigger>

            <SheetContent
              className="overflow-y-auto"
              onInteractOutside={(e) => e.preventDefault()}
            >
              <SheetHeader>
                <SheetTitle>Add new Product</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </SheetDescription>
              </SheetHeader>
              {/* grid grid-cols-4 items-center gap-4 */}
              <div className="grid gap-4 py-4 overflow-y-auto">
                <ProductForm action={"add"} />
              </div>
              {/* <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter> */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Card>
  );
}
