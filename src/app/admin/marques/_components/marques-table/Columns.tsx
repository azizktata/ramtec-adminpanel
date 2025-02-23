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

import toast from "react-hot-toast";
import { deleteMarque, updateMarque } from "@/actions/marque";
import { MarquesAll } from "@/types/marques";
import Image from "next/image";
// import { Product, ProductStatus } from "@/types/product";

export interface SkeletonColumn {
  header: string | React.JSX.Element;
  cell: React.JSX.Element;
}
// const handleSwitchChange = () => {};
async function handleSubmit(formData: FormData) {
  const res = await updateMarque(formData);
  if (res?.success) {
    toast.success(res.message);
  } else {
    toast.error(res?.message);
  }
}

async function handleDeleteMarque(id: string) {
  const res = await deleteMarque(id);
  if (res?.success) {
    toast.success(res?.message);
  } else {
    toast.error(res?.message);
  }
}

export const columns: ColumnDef<MarquesAll>[] = [
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
    header: "Marque",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        {row.original.image && (
          <Image
            src={row.original.image?.url}
            alt={row.original.name}
            width={32}
            height={32}
            className="size-16 object-contain"
          />
        )}

        <Typography className="capitalize block truncate">
          {row.original.name}
        </Typography>
      </div>
    ),
  },
  {
    header: "number of items",
    cell: ({ row }) => (
      <Typography className="block max-w-52 truncate">
        {row.original.products ? row.original.products.length : 0}
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
                <p>Edit Marque</p>
              </TooltipContent>
            </Tooltip>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Marque</SheetTitle>
                <SheetDescription>
                  Click save when you&apos;re done.
                </SheetDescription>
              </SheetHeader>
              <form
                action={handleSubmit}
                className="flex flex-col gap-4 my-4 py-4"
              >
                <input type="hidden" name="id" value={row.original.id} />
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom de marque
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={row.original.name}
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="description" className="text-right">
                    Logo de marque
                  </Label>
                  {row.original.image && (
                    <Image
                      src={row.original.image?.url}
                      alt={row.original.name}
                      width={32}
                      height={32}
                      className="size-8 "
                    />
                  )}
                  <Input
                    id="description"
                    name="image"
                    type="file"
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
                <p>Delete Marque</p>
              </TooltipContent>
            </Tooltip>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your category and its products.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteMarque(row.original.id)}
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
    header: "id",
    cell: <Skeleton className="w-32 h-8" />,
  },
  {
    header: "Marque",
    cell: <Skeleton className="w-32 h-8" />,
  },
  {
    header: "description",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "number of items",
    cell: <Skeleton className="w-20 h-8" />,
  },

  {
    header: "actions",
    cell: <Skeleton className="w-20 h-8" />,
  },
];
