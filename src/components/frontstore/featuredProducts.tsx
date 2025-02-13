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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 md:gap-8 justify-center items-center">
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
