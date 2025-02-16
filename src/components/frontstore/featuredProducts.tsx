import { ProductALL } from "@/types/products-IncludeAll";
import React from "react";
import ProductCard from "./productCard";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function FeaturedProducts({
  products,
}: {
  products: ProductALL[];
}) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]  gap-x-4 gap-y-1 md:gap-x-4 justify-center items-center">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          className="btn btn-sm md:btn-lg btn-primary font-medium"
          href={"/products"}
        >
          <Button>+ See All Products</Button>
        </Link>
      </div>
    </div>
  );
}
