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
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-auto text-center">
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      {/* {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))} */}

      {/* {products.length === 0 && (
        <div className="col-span-4 text-center">
          <p className="text-gray-500">No products found</p>
        </div>
      )} */}
    </div>
  );
}
