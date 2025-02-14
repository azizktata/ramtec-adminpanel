import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
} from "@/components/ui/MultiCarousel";
import Image from "next/image";

type ProductImagesProps = {
  url: string;
};

export default function ProductImages({
  images,
}: {
  images: ProductImagesProps[];
}) {
  return (
    <Carousel>
      <CarouselNext className="top-1/3 -translate-y-1/3" />
      <CarouselPrevious className="top-1/3 -translate-y-1/3" />
      <CarouselMainContainer className="h-[400px] lg:h-[500px]">
        {images.map((image, index) => (
          <SliderMainItem key={index} className="bg-transparent">
            <div className="  bg-[#F2F3F8] p-8   size-full flex items-center justify-center rounded-lg ">
              <Image
                src={image.url || "/banner (2).png"}
                width={312}
                height={269}
                alt={"fallback image"}
                className="w-[312px] h-[280px] md:h-[269px] lg:w-full object-contain p-8 rounded-md 
                            transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
      <CarouselThumbsContainer className="">
        {images.map((image, index) => (
          <SliderThumbItem
            key={index}
            index={index}
            className="bg-transparent "
          >
            <div className=" bg-[#F2F3F8] p-2 md:p-6 lg:p-0 xl:p-6 h-25  size-full flex items-center justify-center rounded-xl ">
              <Image
                src={image.url || "/banner (2).png"}
                width={312}
                height={290}
                alt={"fallback image"}
                className="w-[312px] h-[280px] md:h-[269px] lg:w-full object-contain p-8 rounded-md 
                             transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
}
