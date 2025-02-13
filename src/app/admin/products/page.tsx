import Typography from "@/components/ui/typography";
import React from "react";
import ProductFilters from "./_components/ProductFilters";
import ProductActions from "./_components/ProductActions";
import AllProducts from "./_components/products-table";
import prisma from "@/lib/db";

export default async function Products({
  searchParams,
}: {
  searchParams: {
    category: string;
    filter:
      | "low"
      | "high"
      | "published"
      | "unpublished"
      | "status-selling"
      | "status-out-of-stock"
      | "date-added-asc"
      | "date-added-desc"
      | "date-updated-asc"
      | "date-updated-desc";
    search: string;
    perPage: number;
    page: number;
  };
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orderBy: any = {};
  const perPage = (await searchParams).perPage || 3;
  const page = (await searchParams).page || 1;
  const take = +perPage;
  // page est le coefficient multiplicateur de perPage
  const skip = (page - 1) * perPage;
  // Apply category filter

  if ((await searchParams).category) {
    where.category = { some: { name: (await searchParams).category } };
  }

  if ((await searchParams).search) {
    where.OR = [
      { sku: { contains: (await searchParams).search } },
      { name: { contains: (await searchParams).search } },
    ];
  }

  // Apply filter conditions
  switch ((await searchParams).filter) {
    case "low":
      orderBy.prices = { price: "asc" };
      break;
    case "high":
      orderBy.prices = { price: "desc" };
      break;
    case "published":
      where.published = true;
      break;
    case "unpublished":
      where.published = false;
      break;
    case "status-selling":
      where.status = "SELLING";
      break;
    case "status-out-of-stock":
      where.stock = { equals: 0 };
      break;
    case "date-added-asc":
      orderBy.createdAt = "asc";
      break;
    case "date-added-desc":
      orderBy.createdAt = "desc";
      break;
    case "date-updated-asc":
      orderBy.updatedAt = "asc";
      break;
    case "date-updated-desc":
      orderBy.updatedAt = "desc";
      break;
  }
  const products = await prisma.product.findMany({
    where,
    skip,
    take,
    include: {
      category: true,
      prices: true,
      images: {
        select: {
          url: true,
          id: true,
        },
      },
    },
    orderBy,
  });

  const numberOfProducts = await prisma.product.count();

  const categories = await prisma.category.findMany();
  return (
    <>
      <section>
        <Typography variant="h1" className="mb-6">
          Products
        </Typography>

        <div className="space-y-8 mb-8">
          <ProductActions />
          <ProductFilters categories={categories} />
          <AllProducts
            products={products}
            numberOfProducts={numberOfProducts}
          />
          {/*
           */}

          {/* <DashboardCharts /> */}
        </div>
      </section>
    </>
  );
}
