"use client";
import React from "react";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSlider() {
  const activites = [
    {
      title: "Boost Your Productivity with High-Performance Photocopiers!",
      description:
        "Get ultra-fast, high-quality photocopiers for your office needs. Print, scan, and copy with efficiency!",
      image: "/hero-1.jpg",
      href: "/products/maintenance-reparation",
    },
    {
      title: "Find the Perfect Printer for Your Business!",
      description:
        "Laser or inkjet? Wireless or multifunction? We have the best printers to match your needs!",
      image: "/hero-2.jpg",
      href: "/products",
    },
    {
      title: " Secure Your Business with Advanced Surveillance Cameras!",
      description:
        "Monitor your office 24/7 with our high-definition security cameras. Stay safe and in control!",
      image: "/hero-3.jpg",
      href: "/products",
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
  const highlightText = (text: string) => {
    return text
      .split(new RegExp(`(${wordsToHighlight.join("|")})`, "gi"))
      .map((part, index) =>
        wordsToHighlight.includes(part) ? (
          <span key={index} className="text-[#47C8EB] font-extrabold">
            {part}
          </span>
        ) : (
          part
        )
      );
  };

  const wordsToHighlight = [
    "Professional",
    "high-quality",
    "High-Performance",
    "Secure",
    "Perfect",
    "best printers",
    "high-definition",
  ];

  return (
    <div className="relative w-full flex flex-col items-center ">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        className="w-full   m-auto"
        setApi={setApi}
      >
        <CarouselContent className="  ">
          {activites.map((item, index) => (
            <CarouselItem key={index} className="relative w-full">
              <div>
                <div className="w-full h-[400px]  sm:h-[550px] relative">
                  <Image
                    src={item.image}
                    fill
                    className="object-cover w-auto h-auto object-center"
                    alt="banner image"
                    priority
                  />
                </div>
                <div className="absolute inset-0  max-w-sm sm:max-w-md ml-8 sm:ml-16 lg:ml-24  lg:max-w-2xl z-10 flex items-start   flex flex-col justify-center">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl capitalize font-bold text-white lg:leading-[57px] mb-3">
                    {highlightText(item.title)}
                  </h2>
                  <p className="text-gray-100 font-light max-w-lg text-base mb-8">
                    {highlightText(item.description)}
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-storeSecondary  px-9 py-6 to-blue-800 hover:from-storeSecondary hover:to-blue-900"
                  >
                    <Link href="/products">
                      Shop now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  {/* <Button
                    className="text-base px-9 py-6 bg-storeSecondary rounded-none"
                    variant="default"
                  >
                    <Link href="/products">Shop Now</Link>
                  </Button> */}
                </div>
              </div>
              {/* <div className="flex flex-col md:flex-row items-center px-4 xl:px-16  mx-auto">
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
              </div> */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" hidden sm:flex absolute top-1/2 left-4 transform -translate-y-1/2 z-10 p-2 rounded-none bg-black/70 border-none text-white  hover:bg-white/40" />
        <CarouselNext className="hidden sm:flex  absolute top-1/2 right-4 transform -translate-y-1/2 z-10 p-2 rounded-none bg-black/70 border-none text-white hover:bg-white/40" />
      </Carousel>
      <div className=" justify-center  -mt-8  transform  flex gap-2 w-[60%]">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white w-10" : "bg-[#47C8EB] w-6"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
