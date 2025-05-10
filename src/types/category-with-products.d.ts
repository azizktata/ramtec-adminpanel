import { Prisma } from "@prisma/client";

export type CategoryWithProducts = Prisma.CategoryGetPayload<{
  include: {
    parent: {
      select: {
        name: true;
      };
    };
    subcategories: {
      select: {
        id: true;
        name: true;
      };
    };
    products: {
      select: {
        id: true;
        slug: true;
        name: true;

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
    parent: {
      select: {
        id: true;
        name: true;
      };
    };
    subcategories: {
      select: {
        id: true;
        name: true;
      };
    };
    products: {
      select: {
        id: true;
      };
    };
  };
}>;
export type CategoryWithSubCategories = Prisma.CategoryGetPayload<{
  include: {
    parent: {
      select: {
        id: true;
        name: true;
      };
    };
    subcategories: {
      select: {
        id: true;
        name: true;
        slug: true;

        subcategories: {
          select: {
            id: true;
            name: true;
            slug: true;
            products: {
              select: {
                id: true;
              };
            };
          };
        };
      };
    };
    products: {
      select: {
        id: true;
      };
    };
  };
}>;
