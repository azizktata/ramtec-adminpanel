import { ProductALL } from "@/types/products-IncludeAll";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

export default function ProductListView({
  products,
}: {
  products: ProductALL[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {products.map((product) => (
        <div key={product.id} className="w-full flex items-center gap-6">
          <div className="relative w-[350px] bg-[#F2F3F8] p-8  overflow-hidden">
            <Image
              src={product.images[0].url || "/banner (2).png"}
              width={312}
              height={269}
              alt={"fallback image"}
              className="w-[312px] h-[280px] md:h-[269px] w-full object-contain p-4 rounded-md 
               transition-transform duration-300 ease-in-out group-hover:scale-110"
            />

            {product.prices?.discount !== 0 && product.prices?.discount ? (
              <span className="absolute top-0 right-0 bg-[#0188CC] text-white text-xs font-medium p-1 rounded-bl-md">
                -{product.prices?.discount}%
              </span>
            ) : (
              ""
            )}

            {product.status === "OUT_OF_STOCK" && (
              <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-medium p-1 rounded-tr-md">
                Out of stock
              </span>
            )}
          </div>

          <div className="flex flex-col items-start">
            <div className="flex flex-col items-start  w-full ">
              <p className="text-2xl font-medium">{product.name}</p>
              {product.category && (
                <span className="text-xs font-semibold text-[#0188CC]/60 dark:text-darkmode-dark">
                  {product.category.map((cat) => cat.name).join(", ")}
                </span>
              )}
              <div className="flex flex-wrap justify-center items-center gap-x-2 mt-2 border-b border-gray-300 pb-6">
                {product.prices?.discount !== 0 && product.prices?.discount ? (
                  <>
                    <span className="text-base  font-base text-gray-500 dark:text-darkmode-dark line-through">
                      {product.prices?.price} TND
                    </span>
                    <span className="text-base md:text-xl font-medium text-[#0188CC] dark:text-darkmode-dark">
                      {product.prices?.price -
                        (product.prices?.price * product.prices?.discount) /
                          100}{" "}
                      TND
                    </span>
                  </>
                ) : (
                  <span className="text-base md:text-xl font-medium text-[#0188CC] dark:text-darkmode-dark">
                    {product.prices?.price} TND
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-darkmode-dark mt-6 mb-8">
                {product.description}
              </p>
              <div className="flex gap-4">
                <Button variant={"outline"} className="px-10 py-5">
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
