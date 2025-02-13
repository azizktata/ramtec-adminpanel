import { ProductALL } from "@/types/products-IncludeAll";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Banner({ product }: { product: ProductALL }) {
  const { name, images, prices, category, slug, status, description } = product;
  return (
    <div className="flex flex-col w-full sm:flex-row items-center justify-center bg-[#F5F5F5] px-8 py-8 rounded-md">
      <div className="flex flex-col items-start  w-full sm:w-1/2">
        {category && (
          <span className="text-xs font-semibold text-[#0188CC]/60 dark:text-darkmode-dark">
            {product.category.map((cat) => cat.name).join(", ")}
          </span>
        )}
        <p className="text-lg font-medium">{name}</p>
        <div className="flex flex-wrap justify-center items-center gap-x-2 mt-2 border-b border-gray-300 pb-6">
          {prices?.discount !== 0 && prices?.discount ? (
            <>
              <span className="text-base  font-base text-gray-500 dark:text-darkmode-dark line-through">
                {prices?.price} TND
              </span>
              <span className="text-base md:text-xl font-medium text-[#0188CC] dark:text-darkmode-dark">
                {prices?.price - (prices?.price * prices?.discount) / 100} TND
              </span>
            </>
          ) : (
            <span className="text-base md:text-xl font-medium text-[#0188CC] dark:text-darkmode-dark">
              {prices?.price} TND
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-darkmode-dark mt-6 mb-8">
          {description}
        </p>
        <div className="flex gap-4">
          <Button>Add to cart</Button>
          <Button variant={"outline"} className="text-blue-500">
            Voir produit
          </Button>
        </div>
      </div>
      <div className="w-full relative sm:w-1/2 bg-white self-center rounded-md group overflow-hidden">
        <Image
          src={images[0].url || "/banner (2).png"}
          width={312}
          height={269}
          alt={"fallback image"}
          className="w-[312px] h-[280px] md:h-[269px] lg:w-full object-contain p-8 rounded-md 
               transition-transform duration-300 ease-in-out group-hover:scale-110"
        />

        {prices?.discount !== 0 && prices?.discount ? (
          <span className="absolute top-0 right-0 bg-[#0188CC] text-white text-xs font-medium p-1 rounded-bl-md">
            -{prices?.discount}%
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
