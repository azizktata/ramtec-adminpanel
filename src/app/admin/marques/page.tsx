import Typography from "@/components/ui/typography";
import React from "react";
import prisma from "@/lib/db";

import ShowMarquesTable from "./_components/marques-table";
import MarqueFilters from "./_components/MarqueFilters";
import MarqueActions from "./_components/MarqueActions";

export default async function Marques({
  searchParams,
}: {
  searchParams: {
    search: string;
    perPage: number;
    page: number;
  };
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where = {} as any;

  const perPage = (await searchParams).perPage || 5;
  const page = (await searchParams).page || 1;
  const take = +perPage;
  const skip = (page - 1) * perPage;

  if ((await searchParams).search) {
    where.name = { startsWith: (await searchParams).search };
  }

  const marques = await prisma.marque.findMany({
    where,
    take,
    skip,
    include: {
      image: {
        select: {
          url: true,
        },
      },
      products: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  // console.log(categories); //
  const numberOfMarques = await prisma.marque.count();
  return (
    <>
      <section>
        <Typography variant="h1" className="mb-6">
          Nos marques
        </Typography>

        <div className="space-y-8 mb-8">
          <MarqueActions />
          <MarqueFilters />
          <ShowMarquesTable
            marques={marques}
            numberOfMarques={numberOfMarques}
          />
          {/*
           */}

          {/* <DashboardCharts /> */}
        </div>
      </section>
    </>
  );
}
