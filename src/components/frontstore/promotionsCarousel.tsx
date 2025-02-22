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

import Banner from "./banner";
import { ProductALL } from "@/types/products-IncludeAll";

export default function PromotionsCarousel({
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
        <CarouselContent className="mx-auto flex items-stretch  ">
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className=" lg:basis-1/2 flex items-stretch "
            >
              <Banner product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute hidden md:flex bottom-[-40px] left-1/2 -translate-x-1/2 gap-1 z-10">
          <CarouselPrevious className="rounded bg-storeSecondary border-none text-white rounded-full hover:bg-gray-300" />
          <CarouselNext className="rounded bg-storeSecondary border-none text-white rounded-full hover:bg-gray-300" />
        </div>
      </Carousel>
    </div>
  );
}
