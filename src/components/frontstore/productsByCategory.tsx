import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/db";
import ProductCard from "./productCard";

export default async function ProductsByCategory() {
  const categories = await prisma.category.findMany({
    take: 4,
    include: {
      products: {
        include: {
          images: true,
          prices: true,
        },
      },
    },
  });
  const categoryNames = categories.map((category) => category.name);
  return (
    <div className="container">
      <div className="flex items-center justify-center  mb-3">
        <Tabs defaultValue={categoryNames[0]} className="w-[870px]">
          <TabsList className="grid w-full grid-cols-4  mb-8">
            {categoryNames.map((categoryName) => (
              <TabsTrigger
                value={categoryName}
                key={categoryName}
                className="data-[state=active]:text-blue-500 "
              >
                {categoryName}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.name}
              className="relative  w-full "
            >
              <div className="grid grid-cols-3 w-full gap-4">
                {category.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
