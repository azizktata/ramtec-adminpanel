"use client";

import { Upload, Plus } from "lucide-react";
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
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { addSeller } from "@/actions/seller";

export default function SellerActions() {
  async function handleSubmit(formData: FormData) {
    const res = await addSeller(formData);
    if (res?.success) {
      toast.success(res.message);
    } else {
      toast.error(res?.message);
    }
  }

  return (
    <Card className="mb-5">
      <form className="flex flex-col items-center xl:flex-row xl:justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Upload className="mr-2 size-4" /> Export
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="lg"
                className="sm:flex-grow xl:flex-grow-0 h-12"
              >
                <Plus className="mr-2 size-4 " /> Add Seller
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add new seller</SheetTitle>
                <SheetDescription>
                  Click save when you&apos;re done.
                </SheetDescription>
              </SheetHeader>
              <form
                action={handleSubmit}
                className="flex flex-col my-4 gap-4 py-4"
              >
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" name="name" className="col-span-3" />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="email" className="text-right">
                    email
                  </Label>
                  <Input id="email" name="email" className="col-span-3" />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="phone" className="text-right">
                    phone
                  </Label>
                  <Input id="phone" name="phone" className="col-span-3" />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="address" className="text-right">
                    address
                  </Label>
                  <Input id="address" name="address" className="col-span-3" />
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
      </form>
    </Card>
  );
}
