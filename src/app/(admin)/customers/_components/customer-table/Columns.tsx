import { PenSquare, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Typography from "@/components/ui/typography";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Customer } from "@prisma/client";
import { removeCustomer, updateCustomer } from "@/actions/customer";
import toast from "react-hot-toast";

export interface SkeletonColumn {
  header: string | React.JSX.Element;
  cell: React.JSX.Element;
}
// const handleSwitchChange = () => {};

async function handleSubmit(formData: FormData) {
  const res = await updateCustomer(formData);
  if (res?.success) {
    toast.success(res.message);
  } else {
    toast.error(res?.message);
  }
}

async function handleDeleteCustomer(id: string) {
  const res = await removeCustomer(id);
  if (res?.success) {
    toast.success(res.message);
  } else {
    toast.error(res?.message);
  }
}
export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    header: "id",
    cell: ({ row }) => (
      <Typography className="block max-w-52 truncate">
        {row.original.id}
      </Typography>
    ),
  },
  {
    header: "Customer name",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        {/* <Image
          src={row.original.images[0]}
          alt={row.original.name}
          width={32}
          height={32}
          className="size-8 rounded-full"
        /> */}

        <Typography className="capitalize block truncate">
          {row.original.name}
        </Typography>
      </div>
    ),
  },
  {
    header: "email",
    cell: ({ row }) => (
      <Typography className="block max-w-52 truncate">
        {row.original.email}
      </Typography>
    ),
  },
  {
    header: "phone",
    cell: ({ row }) => (
      <Typography className="block max-w-52 truncate">
        {row.original.phone}
      </Typography>
    ),
  },

  {
    header: "address",
    cell: ({ row }) => (
      <Typography className="block max-w-52 truncate">
        {row.original.address}
      </Typography>
    ),
  },

  {
    header: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <Sheet>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground"
                  >
                    <PenSquare className="size-5" />
                  </Button>
                </SheetTrigger>
              </TooltipTrigger>

              <TooltipContent>
                <p>Edit Customer</p>
              </TooltipContent>
            </Tooltip>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Customer details</SheetTitle>
                <SheetDescription>
                  Make changes to his profile here. Click save when you&apos;re
                  done.
                </SheetDescription>
              </SheetHeader>
              <form
                action={handleSubmit}
                className="flex flex-col my-4 gap-4 py-4"
              >
                <input type="hidden" name="id" value={row.original.id} />
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={row.original.name}
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="email" className="text-right">
                    email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    defaultValue={row.original.email}
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="phone" className="text-right">
                    phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={row.original.phone || ""}
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="address" className="text-right">
                    address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={row.original.address || ""}
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

          <AlertDialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <Trash2 className="size-5" />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>

              <TooltipContent>
                <p>Delete Customer</p>
              </TooltipContent>
            </Tooltip>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteCustomer(row.original.id)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];

export const skeletonColumns: SkeletonColumn[] = [
  {
    header: <Checkbox disabled checked={false} />,
    cell: <Skeleton className="size-4 rounded-sm" />,
  },
  {
    header: "product name",
    cell: (
      <div className="flex gap-2 items-center">
        <Skeleton className="size-8 rounded-full" />

        <Skeleton className="w-28 h-8" />
      </div>
    ),
  },
  {
    header: "category",
    cell: <Skeleton className="w-32 h-8" />,
  },
  {
    header: "price",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "sale price",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "stock",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "status",
    cell: <Skeleton className="w-24 h-8" />,
  },
  {
    header: "view",
    cell: <Skeleton className="w-8 h-8" />,
  },
  {
    header: "published",
    cell: <Skeleton className="w-16 h-10" />,
  },
  {
    header: "actions",
    cell: <Skeleton className="w-20 h-8" />,
  },
];
