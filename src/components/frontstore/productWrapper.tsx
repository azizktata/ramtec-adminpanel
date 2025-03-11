"use client";
import LoadMoreButton from "./loadmoreButton";
import ProductListView from "./productListView";
import ProductGridView from "./productGridView";
import React from "react";
import ProductsSkeleton from "./productsSkeleton";
import { useSearchParams } from "next/navigation";

// interface SearchParams {
//   sort?: string;
//   minPrice?: number;
//   maxPrice?: number;
//   q?: string;
//   c?: string | string[];
//   m?: string | string[];
//   layout?: "list" | "grid";
//   coef?: number;
// }
export default function ProductsWrapper() {
  const searchParams = useSearchParams();
  const coef = Number(searchParams.get("coef")) || 1;
  const layout = searchParams.get("layout") || "grid";

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/products?${new URLSearchParams(searchParams)}`
      );
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [searchParams]); // Refetch when searchParams change

  if (products.length === 0) {
    return (
      <div className="grid grid-cols-4 w-full  mx-auto">
        <p>No products found</p>
      </div>
    );
  }
  return (
    <>
      <div className="mb-8 w-full">
        {loading ? (
          <ProductsSkeleton />
        ) : layout === "list" ? (
          <ProductListView products={products} />
        ) : (
          <ProductGridView products={products} />
        )}
      </div>
      <div className="mx-auto w-full flex justify-center">
        {products.length >= 8 * coef && <LoadMoreButton />}
      </div>
    </>
  );
}
