"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductALL } from "@/types/products-IncludeAll";
import { useAppDispatch } from "@/store/hooks";
import { Button } from "../ui/button";
import { addToCart } from "@/store/slices/cartSlice";

export default function ProductCard({ product }: { product: ProductALL }) {
  const { name, images, prices, category, slug, status } = product;
  const dispatch = useAppDispatch();
  return (
    <div className="text-center  flex-grow  mb-4  group relative ">
      <div className="relative bg-[#F2F3F8] p-8  overflow-hidden">
        <Image
          src={images[0].url || "/banner (2).png"}
          width={312}
          height={269}
          alt={"fallback image"}
          className="w-[312px] h-[280px] md:h-[269px] mx-auto lg:w-full object-contain p-4 rounded-md 
               transition-transform duration-300 ease-in-out group-hover:scale-110"
        />

        {prices?.discount !== 0 && prices?.discount ? (
          <span className="absolute top-0 right-0 bg-[#0188CC] text-white text-xs font-medium p-1 rounded-bl-md">
            -{prices?.discount}%
          </span>
        ) : (
          ""
        )}

        {status === "OUT_OF_STOCK" && (
          <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-medium p-1 rounded-tr-md">
            Out of stock
          </span>
        )}
        <a
          onClick={() => dispatch(addToCart({ item: product, quantity: 1 }))}
          href="#sidebar"
        >
          <Button
            aria-label="Add to cart"
            // aria-disabled={pending ? "true" : "false"}
            className={`max-md:btn-sm z-10 absolute bottom-12 md:bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full md:group-hover:-translate-y-6 duration-300 ease-in-out  whitespace-nowrap drop-shadow-md transition-transform ease-in-out duration-300`}
          >
            Add To Cart
          </Button>
        </a>
      </div>
      <div className="py-2 md:py-4 flex flex-col items-center z-20">
        {category && (
          <span className="text-xs font-semibold text-[#0188CC]/50 dark:text-darkmode-dark">
            {product.category.map((cat) => cat.name).join(", ")}
          </span>
        )}
        <h2 className="font-medium text-base  md:text-lg  ">
          <Link
            className="after:absolute after:inset-0"
            href={`/products/${slug}`}
          >
            {name}
          </Link>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-2 mt-2 ">
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
      </div>
    </div>
  );
}
