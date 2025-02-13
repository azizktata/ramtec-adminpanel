"use client";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
// import Image from "next/image";
import { ProductALL } from "@/types/products-IncludeAll";
import ProductCard from "./productCard";

export default function ProductCarousel({
  products,
}: {
  products: ProductALL[];
}) {
  const plugin = React.useRef(Autoplay());
  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        className="w-full   m-auto"
      >
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
        {/* <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20  p-2 rounded-none bg-dark/70 border-none text-white  hover:bg-white/40" />
        <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20  p-2  rounded-none bg-dark/70 border-none text-white hover:bg-white/40" /> */}
      </Carousel>
    </div>
  );
}
