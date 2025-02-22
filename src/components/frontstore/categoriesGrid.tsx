"use client";
import React from "react";
import Image from "next/image";
import { CategoryWithProducts } from "@/types/category-with-products";
import { ArrowRight } from "lucide-react";

export default function CategoriesGrid({
  categories,
}: {
  categories: CategoryWithProducts[];
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
      <div
        id="big one"
        className="flex flex-col gap-4 items-start justify-between p-8 md:w-1/2 relative bg-[#7FA1C3]  rounded-lg shadow-lg hover:shadow-xl  transition-shadow duration-300"
      >
        <div className="flex flex-col items-start gap-4">
          <h5 className="text-lg md:text-2xl font-medium text-left text-[#FFFFFF]">
            {categories[0].name}
          </h5>
          <div className="border-b border-gray-200 flex items-center gap-1 text-[#FFFFFF]">
            <p className="font-medium text-sm md:text-base">shop now</p>
            <ArrowRight className="size-3" />
          </div>
        </div>
        <div className="self-center relative ">
          <Image
            src={categories[0].products[0].images[0].url}
            alt="Category"
            width={300}
            height={300}
            className="w-[312px] h-[270px] md:h-[400px] md:w-full object-contain rounded-lg "
          />
        </div>
      </div>

      <div className="flex flex-col md:w-1/2 gap-4">
        <div
          id="small one"
          className="flex gap-8 items-start justify-between bg-[#578FCA]  p-8 min-h-[180px] rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-col items-start self-end gap-2">
            <h5 className="text-lg md:text-2xl font-medium text-left text-[#FFFFFF]">
              {categories[1].name}
            </h5>
            <div className="border-b border-gray-200 flex items-center gap-1 text-[#FFFFFF]">
              <p className="font-medium text-sm md:text-base">shop now</p>
              <ArrowRight className="size-3" />
            </div>
          </div>
          <div className="relative self-center">
            <Image
              src={categories[1].products[0].images[0].url}
              alt="Category"
              width={200}
              height={200}
              className="w-[312px] h-[220px] md:w-full object-contain rounded-lg "
            />
          </div>
        </div>

        <div
          id="small two"
          className="flex gap-8 items-start justify-between bg-[#40A2D8]  p-8 min-h-[180px] rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-col items-start self-end gap-2">
            <h5 className="text-lg md:text-2xl font-medium text-left text-[#FFFFFF]">
              {categories[2].name}
            </h5>
            <div className="border-b border-gray-200 flex items-center gap-1 text-[#FFFFFF]">
              <p className="font-medium text-sm md:text-base">shop now</p>
              <ArrowRight className="size-3" />
            </div>
          </div>
          <div className="relative self-center">
            <Image
              src={categories[2].products[0].images[0].url}
              alt="Category"
              width={200}
              height={200}
              className="w-[312px] h-[220px] lg:w-full object-contain rounded-lg "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
