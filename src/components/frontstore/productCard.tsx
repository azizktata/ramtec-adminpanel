"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductALL } from "@/types/products-IncludeAll";
import { useAppDispatch } from "@/store/hooks";
import { Button } from "../ui/button";
import { addToCart } from "@/store/slices/cartSlice";
import { useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { ShoppingBasket } from "lucide-react";
import { optimizeCloudinaryUrl } from "@/utils/optimizeCloudinaryUrl";

export default function ProductCard({ product }: { product: ProductALL }) {
  const { name, images, prices, category, slug, marque } = product;
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const isSeller = session?.user?.role === "SELLER";
  return (
    <div className="text-center  flex-grow self-stretch mb-4  rounded-lg group relative ">
      <div className="relative bg-cardBackground p-8 h-[307px]   overflow-hidden ">
        {images[0] ? (
          <img
            src={optimizeCloudinaryUrl(images[0].url) || "/banner (2).png"}
            width={312}
            height={269}
            alt={"fallback image"}
            className="w-[312px] h-[280px] md:h-[269px] mx-auto lg:w-full object-contain  rounded-md 
                 transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        ) : (
          <Image
            src={"/banner (2).png"}
            width={312}
            height={269}
            alt={"fallback image"}
            className="w-[312px] h-[280px] md:h-[269px] mx-auto lg:w-full object-contain p-4 rounded-md 
                 transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        )}

        {isSeller ? (
          prices?.discountSeller !== 0 && prices?.discountSeller ? (
            <Badge className="absolute top-2 left-2 bg-storeAccent text-white text-xs font-medium p-1 rounded-bl-md">
              -{prices?.discountSeller}%
            </Badge>
          ) : (
            ""
          )
        ) : prices?.discount !== 0 && prices?.discount ? (
          <Badge className="absolute top-2 left-2 bg-storeSecondary text-white text-xs font-medium py-1 px-2 rounded-xl">
            -{prices?.discount}%
          </Badge>
        ) : (
          ""
        )}
        {/* {status === "OUT_OF_STOCK" && (
          <Badge className="absolute top-0 right-0 bg-red-500 text-white text-xs font-medium p-1 rounded-tr-md">
            Out of stock
          </Badge>
        )} */}
        <Badge className="absolute top-2 right-0 border-white text-storeAccent bg-white text-xs font-medium py-1 px-2 rounded-l-full">
          {marque.name}
        </Badge>
        <a
          onClick={() => dispatch(addToCart({ item: product, quantity: 1 }))}
          href="#sidebar"
        >
          <Button
            aria-label="Add to cart"
            // aria-disabled={pending ? "true" : "false"}
            className={`bg-storeSecondary flex items-center max-md:btn-sm z-10 absolute bottom-12 md:bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full md:group-hover:-translate-y-6 duration-300 ease-in-out  whitespace-nowrap drop-shadow-md transition-transform ease-in-out duration-300`}
          >
            <ShoppingBasket className="size-12 " />
            Add To Cart
          </Button>
        </a>
      </div>
      <div className="py-1  flex flex-col items-start px-1 z-20">
        <div className="flex flex-wrap justify-center items-start gap-2 my-2">
          {category && (
            <Badge className="text-xs lowercase font-normal text-storeSecondary bg-white rounded-full py-1 px-3 border border-blue-300 hover:bg-blue-200 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md">
              {category[category.length - 1].name}
            </Badge>
          )}
        </div>

        <h2 className="font-medium text-base text-left  md:text-lg  ">
          <Link
            className="after:absolute after:inset-0"
            href={`/products/${slug}`}
          >
            {name}
          </Link>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-2 mt-2 ">
          {isSeller ? (
            prices?.discountSeller !== 0 && prices?.discountSeller ? (
              <>
                <span className="text-base  font-base text-gray-500 dark:text-darkmode-dark line-through">
                  {prices?.price} <span className="font-light">TND</span>
                </span>
                <span className="text-base md:text-lg font-medium text-storeSecondary dark:text-darkmode-dark">
                  {prices?.price -
                    (prices?.price * prices?.discountSeller) / 100}{" "}
                  <span className="TND">TND</span>
                </span>
              </>
            ) : (
              <span className="text-base md:text-lg font-medium text-storeSecondary dark:text-darkmode-dark">
                {prices?.price} <span className="TND">TND</span>
              </span>
            )
          ) : prices?.discount !== 0 && prices?.discount ? (
            <>
              <span className="text-sm  font-base text-gray-500 dark:text-darkmode-dark line-through">
                {prices?.price} <span className="font-light">TND</span>
              </span>
              <span className="text-base md:text-lg font-medium text-storeSecondary dark:text-darkmode-dark">
                {prices?.price - (prices?.price * prices?.discount) / 100}{" "}
                <span className="TND">TND</span>
              </span>
            </>
          ) : (
            <span className="text-base  font-medium text-storeSecondary dark:text-darkmode-dark">
              {prices?.price} <span className="TND">TND</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
