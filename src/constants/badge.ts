// import { ProductStatus } from "@/types/product";
// import { CouponStatus } from "@/types/coupon";
// import { StaffStatus } from "@/types/staff";

import { BadgeVariantProps } from "@/components/ui/badge";
import { OrderStatus, ProductStatus } from "@prisma/client";
// import { ProductStatus } from "@/types/product";

export const OrderBadgeVariants: Record<OrderStatus, BadgeVariantProps> = {
  PENDING: "warning",
  PROCESSING: "processing",
  DELIVERED: "success",
  CANCEL: "destructive",
};

export const ProductBadgeVariants: Record<ProductStatus, BadgeVariantProps> = {
  "SELLING": "success",
  "OUT_OF_STOCK": "destructive",
};

// export const CouponBadgeVariants: Record<CouponStatus, BadgeVariantProps> = {
//   active: "success",
//   expired: "destructive",
// };

// export const StaffBadgeVariants: Record<StaffStatus, BadgeVariantProps> = {
//   active: "success",
//   inactive: "warning",
// };