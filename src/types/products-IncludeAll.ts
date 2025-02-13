import { Prisma } from "@prisma/client";
export type ProductALL = Prisma.ProductGetPayload<{
  include: { 
    prices: true;
    category: true;
    images: {
    select: {
        url: true;
        id: true;
    }
  } };
}>;

export interface Item extends Omit<ProductALL, "createdAt" | "updatedAt"> {
  quantity?: number;
}


