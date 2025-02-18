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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addUser } from "@/actions/user";
import toast from "react-hot-toast";

export default function UserActions() {
  async function handleSubmit(formData: FormData) {
    const res = await addUser(formData);
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
                <Plus className="mr-2 size-4 " /> Add User
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add new User</SheetTitle>
                <SheetDescription>
                  Make changes here. Click save when you&apos;re done.
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
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="password" className="text-right">
                    password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="phone" className="text-right">
                    phone
                  </Label>
                  <Input
                    id="phone"
                    type="number"
                    name="phone"
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="address" className="text-right">
                    address
                  </Label>
                  <Input id="address" name="address" className="col-span-3" />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="role" className="text-right">
                    role
                  </Label>
                  <Select name="role">
                    <SelectTrigger className=" py-5">
                      <SelectValue placeholder="Roles" />
                    </SelectTrigger>

                    <SelectContent>
                      {/* <SelectItem value="none">All</SelectItem> */}
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      {/* <SelectItem value="CUSTOMER">Customer</SelectItem> */}
                      <SelectItem value="SELLER">Seller</SelectItem>
                    </SelectContent>
                  </Select>
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
