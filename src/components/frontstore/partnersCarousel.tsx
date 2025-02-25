"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MarquesWithImages } from "@/types/marques";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export const PartnersCarousel = ({
  marques,
}: {
  marques: MarquesWithImages[];
}) => {
  const plugin = React.useRef(Autoplay({ stopOnInteraction: true }));
  return (
    <div className="w-full  ">
      <div className="relative w-full rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#F4F4F4]/40 via-white/0 to-[#F4F4F4]/40 z-10 absolute left-0 top-0 right-0 bottom-0 w-full h-full"></div>
        <Carousel
          plugins={[plugin.current]}
          opts={{
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {marques.map((marque, index) => (
              <CarouselItem className="basis-1/3 lg:basis-1/4" key={index}>
                <div className="flex rounded-md  aspect-square bg-muted items-center justify-center p-8">
                  {marque.image ? (
                    <Image
                      src={marque.image?.url}
                      width={200}
                      height={200}
                      alt={marque.name}
                      className="object-contain"
                    />
                  ) : (
                    <span>logo</span>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};
