"use client";
import ProductListView from "./productListView";
import ProductGridView from "./productGridView";
import React from "react";
import ProductsSkeleton from "./productsSkeleton";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

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
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const router = useRouter();
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
  const handleLoadMore = React.useCallback(async () => {
    if (loadingMore) return; // éviter double fetch
    try {
      setLoadingMore(true);
      const newCoef = coef + 1;

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("coef", newCoef.toString());

      router.replace(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
    } finally {
      setLoadingMore(false);
    }
  }, [coef, loadingMore, router, pathname, searchParams]);

  React.useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          if (products.length > 8 * coef) {
            handleLoadMore();
          }
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [products.length, coef, handleLoadMore]);
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

      <div
        ref={loaderRef}
        className="h-10 w-full flex justify-center items-center"
      >
        {products.length > 8 * coef && (
          <Button className="self-center bg-storeSecondary hover:bg-white hover:text-storeSecondary border border-storeSecondary text-white">
            Show more
          </Button>
        )}
      </div>
    </>
  );
}
