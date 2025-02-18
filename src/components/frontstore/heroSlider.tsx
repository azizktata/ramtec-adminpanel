"use client";
import React from "react";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function HeroSlider() {
  const activites = [
    {
      title: "Imprimantes",
      description: "Une large gamme de produits bureautiques ",
      image: "/banner (2).png",
      href: "/products/maintenance-reparation",
    },
    {
      title: "Photocopies de bureau",
      description: "Une large gamme de produits bureautiques ",
      image: "/banner (3).png",
      href: "/products/maintenance-reparation",
    },
  ];

  const plugin = React.useRef(Autoplay());
  const totalSlides = activites.length;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative w-full flex flex-col items-center gap-8">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        className="w-full   m-auto"
        setApi={setApi}
      >
        <CarouselContent className="mx-auto flex ">
          {activites.map((item, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col md:flex-row items-center px-4 xl:px-16  mx-auto">
                <div className="w-full order-1 md:w-1/2">
                  <div className="text-center  py-10 lg:py-0">
                    <div className="">
                      <h1 className="mb-4  text-lg text-[#7E7E7E] font-base ">
                        {item.title}
                      </h1>
                    </div>
                    {item?.description && (
                      <p className="mb-2 lg:mb-10 text-2xl lg:text-4xl leading-12 max-w-lg lg:max-w-xl mx-auto font-medium capitalize">
                        {item.description}
                      </p>
                    )}
                    {item.href && (
                      <Link
                        className="btn btn-sm md:btn-lg btn-primary font-medium"
                        href={`products/${item.href}`}
                      >
                        <Button
                          variant="default"
                          className=" md:px-16 md:py-8 md:text-lg"
                        >
                          Shop Now
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                <div className="w-full sm:w-1/2 order-2">
                  {item.image && (
                    <Image
                      src={item.image}
                      className="mx-auto w-[388px] "
                      width={507}
                      height={300}
                      alt="banner image"
                      priority
                    />
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 p-2 rounded-none bg-black/70 border-none text-white  hover:bg-white/40" />
        <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 p-2 rounded-none bg-black/70 border-none text-white hover:bg-white/40" /> */}
      </Carousel>
      <div className=" justify-center    transform  flex gap-2 w-[60%]">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white w-10" : "bg-blue-300 w-6"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
