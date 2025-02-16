import { Prisma } from "@prisma/client";

export type CategoryWithProducts =  Prisma.CategoryGetPayload<{
    include: {
      products: {
        select: {
          id: true;
          name: true;
          description: true;
        };
      };
    };
  }>