import Typography from "@/components/ui/typography";
import React from "react";
import prisma from "@/lib/db";
import ShowCategoriesTable from "./_components/categories-table";
import CategoryActions from "./_components/CategoryActions";
import CategoryFilters from "./_components/CategoryFilters";

export default async function Categories({
  searchParams,
}: {
  searchParams: {
    filter:
      | "published"
      | "unpublished"
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
  const where = {} as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orderBy = {} as any;

  const perPage = (await searchParams).perPage || 5;
  const page = (await searchParams).page || 1;
  const take = +perPage;
  const skip = (page - 1) * perPage;

  if ((await searchParams).search) {
    where.name = { startsWith: (await searchParams).search };
  }
  switch ((await searchParams).filter) {
    case "published":
      where.published = true;
      break;
    case "unpublished":
      where.published = false;
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

  const categories = await prisma.category.findMany({
    where,
    take,
    skip,
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
    orderBy,
  });
  // console.log(categories); //
  const numberOfCategories = await prisma.category.count();
  return (
    <>
      <section>
        <Typography variant="h1" className="mb-6">
          Categories
        </Typography>

        <div className="space-y-8 mb-8">
          <CategoryActions />
          <CategoryFilters categories={categories} />
          <ShowCategoriesTable
            categories={categories}
            numberOfCategories={numberOfCategories}
          />
          {/*
           */}

          {/* <DashboardCharts /> */}
        </div>
      </section>
    </>
  );
}
