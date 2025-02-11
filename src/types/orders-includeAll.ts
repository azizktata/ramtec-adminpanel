import { Prisma } from "@prisma/client";
export type OrderALL = Prisma.OrderGetPayload<{
  
    include: {
        customer: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        items: {
          select: {
            product: {
              select: {
                name: true,
                
              },
            },
            quantity: true,
            price: true,
          },
        },
      },
   
}>;