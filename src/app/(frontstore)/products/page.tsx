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
import LoadMoreButton from "@/components/frontstore/loadmoreButton";

interface SearchParams {
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  q?: string;
  c?: string | string[];
  m?: string | string[];
  layout?: "list" | "grid";
  coef?: number;
}
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const {
    sort,
    minPrice,
    maxPrice,
    q: searchValue,
    m: marqueParam,
    c: categoryParam,
    layout,
  } = (await searchParams) as {
    [key: string]: string;
  };
  const coef = (await searchParams).coef || 1;

  const categorySlugs = Array.isArray(categoryParam)
    ? categoryParam
    : categoryParam
    ? [categoryParam]
    : [];

  const marqueNames = Array.isArray(marqueParam)
    ? marqueParam
    : marqueParam
    ? [marqueParam]
    : [];

  const products = await prisma.product.findMany({
    take: 8 * coef,
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
          OR: [
            {
              slug: {
                in: categorySlugs.length > 0 ? categorySlugs : undefined, // Parent categories
              },
            },
            {
              parent: {
                slug: {
                  in: categorySlugs.length > 0 ? categorySlugs : undefined,
                },
              },
            },
          ],
        },
      },
      marque: {
        name: {
          in: marqueNames.length > 0 ? marqueNames : undefined,
        },
      },
    },

    include: {
      category: true,
      prices: true,
      marque: true,
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
      parent: {
        select: {
          id: true,
          name: true,
        },
      },
      subcategories: {
        select: {
          id: true,
          name: true,
        },
      },
      products: {
        select: {
          id: true,
        },
      },
    },
  });
  const marques = await prisma.marque.findMany({
    include: {
      products: {
        select: {
          id: true,
          name: true,
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
                  marques={marques}
                  maxPriceData={maxPriceData?.prices?.price || 9999}
                />
              </div>
              <ProductLayouts
                categories={categories}
                marques={marques}
                maxPriceData={maxPriceData?.prices?.price || 9999}
              />
            </div>
          </div>
          <div className="mb-8">
            {layout === "list" ? (
              <ProductListView products={products} />
            ) : (
              <ProductGridView products={products} />
            )}
          </div>
          {products.length >= 8 * coef && <LoadMoreButton />}
        </div>
      </div>
    </div>
  );
}
