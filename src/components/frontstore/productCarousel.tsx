"use client";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
// import Image from "next/image";
import { ProductALL } from "@/types/products-IncludeAll";
import ProductCard from "./productCard";

export default function ProductCarousel({
  products,
}: {
  products: ProductALL[];
}) {
  const plugin = React.useRef(Autoplay({ stopOnInteraction: true }));
  return (
    <div className="relative pt-8">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        className="w-full relative  m-auto"
      >
        <div className="absolute -top-10 right-12 flex gap-1 z-20">
          <CarouselPrevious className=" rounded bg-gray-200 border-none text-gray-700 hover:bg-gray-300" />
          <CarouselNext className=" rounded bg-gray-200 border-none text-gray-700 hover:bg-gray-300" />
        </div>
        {/* <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20  p-2 rounded-none bg-dark/70 border-none text-white  hover:bg-white/40" />
        <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20  p-2  rounded-none bg-dark/70 border-none text-white hover:bg-white/40" /> */}
        <CarouselContent className="mx-auto  flex ">
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/4  flex justify-center items-center"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
