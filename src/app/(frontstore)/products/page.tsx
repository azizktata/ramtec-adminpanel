import ProductFilters from "@/components/frontstore/productFilter";
import ProductGridView from "@/components/frontstore/productGridView";
import ProductLayouts from "@/components/frontstore/productLayouts";
import ProductListView from "@/components/frontstore/productListView";
import prisma from "@/lib/db";
import React from "react";
import Link from "next/link";
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

interface SearchParams {
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  q?: string;
  c?: string | string[];
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
    c: categoryParam,
    layout,
  } = (await searchParams) as {
    [key: string]: string;
  };

  const categorySlugs = Array.isArray(categoryParam)
    ? categoryParam
    : categoryParam
    ? [categoryParam]
    : [];

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
          slug: {
            in: categorySlugs.length > 0 ? categorySlugs : undefined,
          },
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
          name: true,
          slug: true,
          description: true,
          images: {
            select: {
              url: true,
            },
          },
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
    <div className=" container py-8">
      <div className="flex">
        {/* <div className="flex flex-col lg:flex-row  gap-16">
        <div className=" hidden lg:block lg:w-1/3  lg:max-w-[400] mt-16">
          <ProductFilters
            categories={categories}
            maxPriceData={maxPriceData?.prices?.price || 9999}
          />
        </div> */}

        <div className="w-full  flex flex-col gap-4">
          <div className="w-full  ">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link className="text-sm" href="/">
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash className="text-storeAccent" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Link className="text-sm" href="/products">
                      Products
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between items-center ">
              <div className="hidden md:flex">
                <ProductFilters
                  categories={categories}
                  maxPriceData={maxPriceData?.prices?.price || 9999}
                />
              </div>
              <ProductLayouts
                categories={categories}
                maxPriceData={maxPriceData?.prices?.price || 9999}
              />
            </div>
          </div>
          <div className="">
            {layout === "list" ? (
              <ProductListView products={products} />
            ) : (
              <ProductGridView products={products} />
            )}
          </div>
          <Button className="self-center bg-storeSecondary">Show More</Button>
        </div>
      </div>
    </div>
  );
}
