"use client";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";

export default function CategoriesCarousel() {
  const categories = [
    // {
    //   title: "Bureautique",
    //   image: "/banner (1).png",
    //   href: "/products/maintenance-reparation",
    // },
    {
      title: "Imprimantes",
      image: "/banner (2).png",
      href: "/products/maintenance-reparation",
    },
    {
      title: "Photocopies",
      image: "/banner (3).png",
      href: "/products/maintenance-reparation",
    },
    {
      title: "Imprimantes",
      image: "/banner (2).png",
      href: "/products/maintenance-reparation",
    },
    {
      title: "Photocopies",
      image: "/banner (3).png",
      href: "/products/maintenance-reparation",
    },
    {
      title: "Imprimantes",
      image: "/banner (2).png",
      href: "/products/maintenance-reparation",
    },
    {
      title: "Photocopies",
      image: "/banner (3).png",
      href: "/products/maintenance-reparation",
    },
  ];
  const plugin = React.useRef(Autoplay());
  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        // opts={{
        //   loop: true,
        // }}
        className="w-full   m-auto"
      >
        <CarouselContent className="mx-auto flex ">
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/5 flex justify-center items-center"
            >
              <div className="group flex flex-col items-center flex-grow rounded-full">
                <div className="max-w-[160px] w-full bg-[#F2F3F8] h-40 rounded-full flex items-center justify-center mb-4">
                  <Image
                    src={category.image}
                    alt="Category"
                    width={120}
                    height={62}
                  />
                </div>

                <div className="flex justify-center">
                  <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
                    {category.title}
                  </h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
