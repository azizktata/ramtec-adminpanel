import { ProductALL } from "@/types/products-IncludeAll";
import React from "react";
import ProductCard from "./productCard";

export default function ProductGridView({
  products,
}: {
  products: ProductALL[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
