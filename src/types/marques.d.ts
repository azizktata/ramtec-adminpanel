import { Prisma } from "@prisma/client";

export type MarquesAll = Prisma.MarqueGetPayload<{
  include: {
    image: {
      select: {
        url: true;
      };
    };
    products: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

export type MarqueWithProducts = Prisma.MarqueGetPayload<{
  include: {
    products: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

export type MarquesWithImages = Prisma.MarqueGetPayload<{
  include: {
    image: {
      select: {
        url: true;
      };
    };
  };
}>;
