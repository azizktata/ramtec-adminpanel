import React from "react";
import { Printer, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { formatAmount } from "@/utils/formatAmount";

import { ORDER_STATUSES } from "@/constants/orders";
import { OrderBadgeVariants } from "@/constants/badge";
import { OrderALL } from "@/types/orders-includeAll";
import { deleteOrder, updateOrderStatus } from "@/actions/orders";
import { OrderStatus } from "@prisma/client";
import toast from "react-hot-toast";

export interface SkeletonColumn {
  header: string | React.JSX.Element;
  cell: React.JSX.Element;
}
const changeStatus = async (value: OrderStatus, invoiceNo: string) => {
  const res = await updateOrderStatus(invoiceNo, value);
  if (res.success) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
  }
};

async function handleDeleteOrder(id: string) {
  const res = await deleteOrder(id);
  if (res?.success) {
    toast.success(res.message);
  } else {
    toast.error(res?.message);
  }
}
// const printInvoice = (invoiceNo: string) => {};

export const columns: ColumnDef<OrderALL>[] = [
  {
    header: "invoice no",
    cell: ({ row }) => row.original.invoiceNo,
  },
  {
    header: "order time",
    cell: ({ row }) =>
      `${format(row.original.orderTime, "PP")} ${format(
        row.original.orderTime,
        "p"
      )}`,
  },
  {
    header: "customer name",
    cell: ({ row }) => (
      <span className="block max-w-52 truncate">
        {row.original.customer.name}
      </span>
    ),
  },
  {
    header: "method",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.method}</span>
    ),
  },
  {
    header: "address",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.address}</span>
    ),
  },
  {
    header: "amount",
    cell: ({ row }) => formatAmount(row.original.amount),
  },
  {
    header: "status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          variant={OrderBadgeVariants[status]}
          className="flex-shrink-0 text-xs capitalize"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    header: "action",
    cell: ({ row }) => {
      const invoiceNo = row.original.invoiceNo;

      return (
        <Select
          onValueChange={(value: OrderStatus) => changeStatus(value, invoiceNo)}
        >
          <SelectTrigger className="capitalize">
            <SelectValue placeholder={row.original.status} />
          </SelectTrigger>

          <SelectContent>
            {ORDER_STATUSES.map((badgeStatus) => (
              <SelectItem
                value={badgeStatus}
                key={badgeStatus}
                className="capitalize"
              >
                {badgeStatus}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
  {
    header: "invoice",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                // onClick={() => printInvoice(row.original.invoiceNo)}
                className="text-foreground"
              >
                <Printer className="size-5" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Print Invoice</p>
            </TooltipContent>
          </Tooltip>

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
                <p>Delete Order</p>
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
                  onClick={() => handleDeleteOrder(row.original.id)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground"
                asChild
              >
                <ZoomInIcon className="size-5" />
              
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>View Invoice</p>
            </TooltipContent>
          </Tooltip> */}
        </div>
      );
    },
  },
];

export const skeletonColumns: SkeletonColumn[] = [
  {
    header: "invoice no",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "order time",
    cell: <Skeleton className="w-32 h-8" />,
  },
  {
    header: "customer name",
    cell: <Skeleton className="w-32 h-8" />,
  },
  {
    header: "method",
    cell: <Skeleton className="w-14 h-8" />,
  },
  {
    header: "amount",
    cell: <Skeleton className="w-16 h-8" />,
  },
  {
    header: "status",
    cell: <Skeleton className="w-16 h-8" />,
  },
  {
    header: "action",
    cell: <Skeleton className="w-24 h-10" />,
  },
  {
    header: "invoice",
    cell: <Skeleton className="w-20 h-8" />,
  },
];
