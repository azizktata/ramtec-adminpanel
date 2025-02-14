import ProductFilters from "@/components/frontstore/productFilter";
import ProductGridView from "@/components/frontstore/productGridView";
import ProductLayouts from "@/components/frontstore/productLayouts";
import ProductListView from "@/components/frontstore/productListView";
import prisma from "@/lib/db";
import React from "react";
interface SearchParams {
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  q?: string;
  c?: string;
  layout?: "list" | "grid";
}
export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const {
    sort,
    minPrice,
    maxPrice,
    q: searchValue,
    c: category,
    layout,
  } = (await searchParams) as {
    [key: string]: string;
  };

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchValue,
      },
      prices: {
        price: {
          gte: minPrice ? parseFloat(minPrice) : undefined,
          lte: maxPrice ? parseFloat(maxPrice) : undefined,
        },
      },
      category: {
        some: {
          name: category,
        },
      },
    },
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
    orderBy: {
      prices: {
        price: sort === "asc" ? "asc" : "desc",
      },
    },
  });
  const categories = await prisma.category.findMany({
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
  });
  const maxPriceData = await prisma.product.findFirst({
    select: {
      prices: {
        select: {
          price: true,
        },
      },
    },
    orderBy: {
      prices: {
        price: "desc",
      },
    },
  });

  return (
    <div className=" container">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className=" hidden lg:block lg:w-1/3  lg:max-w-[400] mt-16">
          <ProductFilters
            categories={categories}
            maxPriceData={maxPriceData?.prices?.price || 9999}
          />
        </div>

        <div className="w-full  flex flex-col gap-4">
          <div className="w-full  ">
            <ProductLayouts
              categories={categories}
              maxPriceData={maxPriceData?.prices?.price || 9999}
            />
          </div>
          <div className="">
            {layout === "list" ? (
              <ProductListView products={products} />
            ) : (
              <ProductGridView products={products} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
