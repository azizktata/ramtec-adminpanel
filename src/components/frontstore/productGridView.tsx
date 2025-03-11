import { ProductALL } from "@/types/products-IncludeAll";
import React from "react";
import ProductCard from "./productCard";

export default function ProductGridView({
  products,
}: {
  products: ProductALL[];
}) {
  // if (products.length === 0) {
  //   return <p>No products found</p>;
  // }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
