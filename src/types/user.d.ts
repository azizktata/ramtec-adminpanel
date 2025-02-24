import { Prisma } from "@prisma/client";

export type UserInfo = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    phone: true;
    address: true;
    role: true;
    createdAt: true;
    updatedAt: true;
  };
}>;
