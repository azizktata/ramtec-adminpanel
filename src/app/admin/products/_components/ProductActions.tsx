"use client";
import { Upload, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import ProductForm from "./productForm";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

export default function ProductActions() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <Card className="mb-5">
      <div className="flex flex-col md:items-center xl:flex-row xl:justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Upload className="mr-2 size-4" /> Export
          </Button>

          {/* <Button variant="outline">
            <Download className="mr-2 size-4" /> Import
          </Button> */}
        </div>
        {isDesktop ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="lg"
                className="sm:flex-grow xl:flex-grow-0 h-12"
              >
                <Plus className="mr-2 size-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add product</DialogTitle>
                <DialogDescription>
                  Add poduct informations here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <ProductForm action={"add"} />
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="default"
                size="lg"
                className="sm:flex-grow xl:flex-grow-0"
              >
                <Plus className="mr-2 size-4" /> Add Product
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>Add product</DrawerTitle>
                <DrawerDescription>
                  Add poduct informations here. Click save when you&apos;re
                  done.
                </DrawerDescription>
              </DrawerHeader>
              {/* <ProfileForm className="px-4" /> */}
              <div className="px-4">
                <ProductForm action={"add"} />
              </div>
              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
        {/*
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

              <div className="grid gap-4 py-4 overflow-y-auto">
                <ProductForm action={"add"} />
              </div>
            </SheetContent>
          </Sheet> 

        </div>
          */}
      </div>
    </Card>
  );
}
