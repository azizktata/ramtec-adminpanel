import { Prisma } from "@prisma/client";
export type ProductALL = Prisma.ProductGetPayload<{
  include: { 
    prices: true;
    category: true;
    images: {
    select: {
        url: true;
    }
  } };
}>;