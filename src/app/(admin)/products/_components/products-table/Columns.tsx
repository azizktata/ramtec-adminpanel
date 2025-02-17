import Image from "next/image";
import { ZoomIn, PenSquare, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";

import { Skeleton } from "@/components/ui/skeleton";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatAmount } from "@/utils/formatAmount";

import { ProductBadgeVariants } from "@/constants/badge";
// import { Product, ProductStatus } from "@/types/product";
import { ProductALL } from "@/types/products-IncludeAll";
import ProductForm from "../productForm";
import {
  deleteProduct,
  updatePublisherStatus,
  updateStatus,
} from "@/actions/product";
import toast from "react-hot-toast";
import React from "react";

export interface SkeletonColumn {
  header: string | React.JSX.Element;
  cell: React.JSX.Element;
}
const handleSwitchChange = async (id: string) => {
  const res = await updatePublisherStatus(id);
  if (res) {
    if (res?.success) {
      toast.success(res.message);
    } else {
      toast.error(res!.message);
    }
  }
};
const handleProductStatus = async (id: string) => {
  const res = await updateStatus(id);
  if (res) {
    if (res?.success) {
      toast.success(res.message);
    } else {
      toast.error(res!.message);
    }
  }
};

export const columns: ColumnDef<ProductALL>[] = [
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
    header: "product name",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        {row.original.images.length > 0 && (
          <Image
            src={row.original.images[0].url || "https://placehold.co/32x32"}
            alt={row.original.name}
            width={32}
            height={32}
            className="size-8 rounded-full"
            placeholder="blur"
            blurDataURL="https://placehold.co/32x32"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/32x32"; // Fallback image URL
              (e.target as HTMLImageElement).onerror = null; // Prevent an infinite loop if the fallback image fails
            }}
          />
        )}

        <Typography className="capitalize block truncate">
          {row.original.name}
        </Typography>
      </div>
    ),
  },
  {
    header: "sku",
    cell: ({ row }) => (
      <Typography className="block max-w-52 truncate">
        {row.original.sku}
      </Typography>
    ),
  },
  {
    header: "category",
    cell: ({ row }) => (
      <Typography className="block max-w-52 truncate">
        {row.original.category[0].name}
      </Typography>
    ),
  },
  {
    header: "price",
    cell: ({ row }) => {
      return formatAmount(row.original.prices!.price);
    },
  },
  {
    header: "sale price",
    cell: ({ row }) => {
      const { price, discount } = row.original.prices!;

      return formatAmount((price * (100 - discount)) / 100);
    },
  },
  {
    header: "stock",
    cell: ({ row }) => row.original.stock,
  },
  {
    header: "status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          variant={ProductBadgeVariants[status]}
          className="flex-shrink-0 text-xs cursor-pointer"
          onClick={() => handleProductStatus(row.original.id)}
        >
          {status === "SELLING" ? "Selling" : "Out of stock"}
        </Badge>
      );
    },
  },
  {
    header: "view",
    cell: () => (
      <Button size="icon" asChild variant="ghost" className="text-foreground">
        {/* <Link href={`/product/${row.original.slug}`}> */}
        <ZoomIn className="size-5" />
        {/* </Link> */}
      </Button>
    ),
  },
  {
    header: "published",
    cell: ({ row }) => (
      <div className="pl-5">
        <Switch
          checked={row.original.published}
          onCheckedChange={() => handleSwitchChange(row.original.id)}
        />
      </div>
    ),
  },
  {
    header: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <PenSquare className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[600px] overflow-y-auto h-[550px]">
              <DialogHeader>
                <DialogTitle>Edit product</DialogTitle>
                <DialogDescription>
                  Make changes to product here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <ProductForm action={"update"} product={row.original} />
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground"
                  >
                    <Trash2 className="size-5" />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>

              <TooltipContent>
                <p>Delete Product</p>
              </TooltipContent>
            </Tooltip>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this product and remove the data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const res = await deleteProduct(row.original.id);
                    if (res) {
                      if (res?.success) {
                        toast.success(res.message);
                      } else {
                        toast.error(res!.message);
                      }
                    }
                  }}
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
// Add a delete icon from react-icons
