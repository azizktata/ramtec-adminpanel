import Typography from "@/components/ui/typography";
import React from "react";
import prisma from "@/lib/db";
import ShowCategoriesTable from "./categories-table";

export default async function Categories() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
  });
  console.log(categories); //
  return (
    <>
      <section>
        <Typography variant="h1" className="mb-6">
          Categories
        </Typography>

        <div className="space-y-8 mb-8">
          <ShowCategoriesTable categories={categories} />
          {/*
           */}

          {/* <DashboardCharts /> */}
        </div>
      </section>
    </>
  );
}
