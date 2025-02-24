import { Prisma } from "@prisma/client";

export type CategoryWithProducts = Prisma.CategoryGetPayload<{
  include: {
    products: {
      select: {
        id: true;
        slug: true;
        name: true;
        description: true;
        images: {
          select: {
            url: true;
          };
        };
      };
    };
  };
}>;

export type CategoryWithProductsIds = Prisma.CategoryGetPayload<{
  include: {
    products: {
      select: {
        id: true;
      };
    };
  };
}>;
