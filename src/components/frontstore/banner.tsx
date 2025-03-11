"use client";
import { ProductALL } from "@/types/products-IncludeAll";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { Badge } from "../ui/badge";

export default function Banner({ product }: { product: ProductALL }) {
  const { name, images, prices, category, slug, description } = product;
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-6 sm:gap-4 w-full sm:flex-row items-center justify-center bg-[#F5F5F5] px-8 py-8 rounded-md">
      <div className="flex flex-col items-start max-w-md w-full sm:w-1/2">
        <p className="text-lg font-medium">{name}</p>
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
        <Badge className="absolute top-2 right-0 border-white text-storeAccent hover:bg-storeAccent hover:text-white bg-white text-xs font-medium py-1 px-2 rounded-l-full">
          {product.marque.name}
        </Badge>
        <div className="flex flex-wrap justify-center items-start gap-2 mt-6 border-b border-gray-300 pb-6">
          {category && (
            <Badge className="text-xs lowercase font-normal text-storeSecondary bg-white rounded-full py-1 px-3 border border-blue-300 hover:bg-blue-200 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md">
              {category[category.length - 1].name}
            </Badge>
          )}
        </div>
        <p className="hidden sm:flex text-sm text-gray-500 dark:text-darkmode-dark mt-6 mb-8">
          {description}
        </p>

        <div className="flex  gap-3">
          <a
            onClick={() => dispatch(addToCart({ item: product, quantity: 1 }))}
            href="#sidebar"
          >
            <Button className="bg-storeSecondary hover:bg-storePrimary">
              <ShoppingBasket />
              Add to cart
            </Button>
          </a>
          <Button variant={"outline"} className="text-storeSecondary">
            <Link href={`/products/${slug}`}>Voir produit</Link>
          </Button>
        </div>
      </div>
      <div className="w-full relative sm:w-1/2 bg-white max-w-md self-center rounded-md group overflow-hidden">
        <Image
          src={images[0].url || "/banner (2).png"}
          width={312}
          height={269}
          alt={"fallback image"}
          className="w-[312px] h-[280px] md:h-[269px] lg:w-full mx-auto object-contain p-8 rounded-md 
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
