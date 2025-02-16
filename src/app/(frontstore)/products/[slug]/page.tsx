import ProductCarousel from "@/components/frontstore/productCarousel";
import ProductDetails from "@/components/frontstore/productDetails";
import ProductImages from "@/components/frontstore/productImagesMultiCarousel";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Slash } from "lucide-react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = await prisma.product.findFirst({
    include: {
      prices: true,
      category: true,
      images: {
        select: {
          url: true,
          id: true,
        },
      },
    },
    where: {
      slug,
    },
  });

  const relatedProducts = await prisma.product.findMany({
    include: {
      prices: true,
      category: true,
      images: {
        select: {
          url: true,
          id: true,
        },
      },
    },
    where: {
      category: {
        some: {
          id: product?.category[0].id,
        },
      },
      NOT: {
        id: product?.id,
      },
    },
  });
  return (
    <div className="w-[90%] md:w-[70%] lg:w-[85%] mx-auto my-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className="text-sm" href="/">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className="text-sm" href="/products">
                Products
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{product && product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-1/2 max-w-xl  lg:mb-8">
          <ProductImages images={product?.images ?? []} />
        </div>
        <div className="  w-full lg:w-1/2 max-w-xl">
          {product && <ProductDetails product={product} />}
        </div>
      </div>
      <div className="w-full bg-[#F5F5F5] px-8 py-12 rounded-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
        <p className="text-base text-gray-500 dark:text-darkmode-dark">
          {product?.description}
        </p>
      </div>
      {relatedProducts.length > 0 && (
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-semibold mb-4 mt-16 ">
            Related Products
          </h2>
          <div className="">
            <ProductCarousel products={relatedProducts} />
          </div>
          <Button className="self-center">See all products+</Button>
        </div>
      )}
    </div>
  );
}
