"use client";
import { ProductALL } from "@/types/products-IncludeAll";
import React from "react";
import Image from "next/image";

import { Badge } from "../ui/badge";
import { addToCart } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ProductListView({
  products,
}: {
  products: ProductALL[];
}) {
  const dispatch = useAppDispatch();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-4">
      {products.map((product) => (
        <div key={product.id} className="w-full flex items-stretch gap-6">
          <div className="relative w-[350px] bg-cardBackground p-3 sm:p-8  overflow-hidden">
            <Image
              src={product.images[0].url || "/banner (2).png"}
              width={312}
              height={269}
              alt={"fallback image"}
              className="w-[312px] h-[200px] sm:h-[280px] md:h-[269px] w-full object-contain  rounded-md 
               transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <Badge className="absolute top-8 right-0 border-white text-storeAccent hover:bg-storeAccent hover:text-white bg-white text-xs font-medium py-1 px-2 rounded-l-full">
              {product.marque.name}
            </Badge>
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

          <div className="flex flex-col items-start  ">
            <div className="flex flex-col items-start  w-full ">
              <Link href={`/products/${product.slug}`}>
                <p className="text-base sm:text-lg md:text-2xl font-medium">
                  {product.name}
                </p>
              </Link>

              <div className="flex flex-wrap justify-center items-center gap-x-2 mt-2 ">
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
              <div className=" py-4 w-full">
                {product.category && (
                  <Badge className="text-[8px] sm:text-xs  lowercase font-normal text-storeSecondary bg-white rounded-full py-1 px-3 border border-blue-300 hover:bg-blue-200 transition-colors duration-200 ease-in-out shadow-sm hover:shadow-md">
                    {product.category[product.category.length - 1].name}
                  </Badge>
                )}
              </div>
              <div className="hidden sm:flex border-t border-gray-300">
                <p className="  text-sm text-gray-500 dark:text-darkmode-dark mt-6 mb-8">
                  {product.description}
                </p>
              </div>
            </div>
            <div className="flex gap-4   mt-auto">
              <a
                onClick={() =>
                  dispatch(addToCart({ item: product, quantity: 1 }))
                }
                href="#sidebar"
              >
                <Button className="flex items-center px-7 py-4 rounded-md bg-storeSecondary self-center text-white font-base transition duration-200 hover:bg-white hover:text-storeSecondary border-2 border-transparent hover:border-storeSecondary">
                  <ShoppingBasket className="size-8 " /> Add to cart
                </Button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
