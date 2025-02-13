import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AddToCart } from "./addToCart";
import { ProductALL } from "@/types/products-IncludeAll";

export default function ProductCard({ product }: { product: ProductALL }) {
  const { name, images, prices, category, slug, status } = product;
  return (
    <div>
      <div className="text-center  col-6 md:col-4 lg:col-3 mb-8 md:mb-14 group relative">
        <div className="relative bg-[#F2F3F8] overflow-hidden">
          <Image
            src={images[0].url || "/banner (2).png"}
            width={312}
            height={269}
            alt={"fallback image"}
            className="w-[312px] h-[150px] md:h-[269px] lg:w-full object-contain border rounded-md"
          />

          <AddToCart
            //   variants={product.variants}
            availableForSale={status === "SELLING" ? true : false}
            //   defaultVariantId={defaultVariantId}
            stylesClass={
              "btn btn-primary max-md:btn-sm z-10 absolute bottom-12 md:bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full md:group-hover:-translate-y-6 duration-300 ease-in-out whitespace-nowrap drop-shadow-md"
            }
          />
        </div>
        <div className="py-2 md:py-4 text-center z-20">
          <h2 className="font-medium text-base md:text-xl">
            <Link
              className="after:absolute after:inset-0"
              href={`/products/${slug}`}
            >
              {name}
            </Link>
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-x-2 mt-2 md:mt-4">
            {prices?.discount !== 0 && prices?.discount ? (
              <>
                <span className="text-base md:text-xl font-bold text-dark dark:text-darkmode-dark">
                  {prices?.price - (prices?.price * prices?.discount) / 100} TND
                </span>
                <span className="text-base md:text-xl font-base text-gray-500 dark:text-darkmode-dark line-through">
                  {prices?.price} TND
                </span>
              </>
            ) : (
              <span className="text-base md:text-xl font-bold text-dark dark:text-darkmode-dark">
                {prices?.price} TND
              </span>
            )}

            {/* {parseFloat(compareAtPriceRange?.maxVariantPrice.amount) >
                  0 ? (
                    <s className="text-light dark:text-darkmode-light text-xs md:text-base font-medium">
                     
                      {compareAtPriceRange?.maxVariantPrice.amount}{" "}
                      {compareAtPriceRange?.maxVariantPrice?.currencyCode}
                    </s>
                  ) : (
                    ""
                  )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
