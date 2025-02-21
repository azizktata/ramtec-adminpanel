"use client";

import { CategoryWithProducts } from "@/types/category-with-products";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DualRangeSlider } from "../ui/dual-range-slider";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Printer, RefreshCcw } from "lucide-react";
// import { Slider } from "@/components/ui/slider";

const ProductFilters = ({
  categories,

  maxPriceData,
}: {
  categories: CategoryWithProducts[];

  maxPriceData: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  //   const selectedBrands = searchParams.getAll("b");
  const selectedCategory = searchParams.get("c");

  const handleCategoryClick = (handle: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (handle === selectedCategory) {
      newParams.delete("c");
    } else {
      newParams.set("c", handle);
    }
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };
  function resetFilters() {
    router.push(pathname, { scroll: false });
    setValues([0, maxPriceData]);
  }

  const [values, setValues] = React.useState([0, maxPriceData]);
  function handleSliderChange(value: number[]) {
    const params = new URLSearchParams(searchParams.toString());

    if (value[0] !== 0) {
      params.set("minPrice", value[0].toString());
    } else {
      params.delete("minPrice");
    }
    if (value[1] !== maxPriceData) {
      params.set("maxPrice", value[1].toString());
    } else {
      params.delete("maxPrice");
    }
    router.push(`${pathname}?${params.toString()}`); // }
    console.log(value);
  }

  return (
    <div className="lg:border-r border-gray-200 dark:border-gray-700 p-2  w-full lg:px-8">
      <div>
        <h5 className="mb-2 text-base lg:text-lg font-semibold border-b border-gray-200 pb-3">
          Select Price Range
        </h5>
        <div className="w-full py-12 ">
          <DualRangeSlider
            onValueChange={(value) => {
              setValues(value);
              handleSliderChange(value);
            }}
            name="maxPrice"
            defaultValue={[0, maxPriceData]}
            max={maxPriceData}
            value={values}
            step={100}
            label={(value) => (
              <span className="flex items-center gap-1">
                {value}{" "}
                <span className="text-xs text-gray-600 font-light"> TND</span>
              </span>
            )}
          />
        </div>
      </div>

      <div>
        <h5 className="mb-2 mt-4 text-base lg:text-lg font-semibold  border-b border-gray-200 pb-3 ">
          Categories
        </h5>

        <ul className="mt-4 space-y-4 w-full">
          {/* {categories.map((category) => (
            <li
              key={category.id}
              className={`flex items-center justify-between cursor-pointer ${
                selectedCategory === category.slug
                  ? "text-dark dark:text-darkmode-dark font-semibold"
                  : "text-light dark:text-darkmode-light"
              }`}
              onClick={() => handleCategoryClick(category.slug)}
            >
              {category.name}{" "}
              <span className="text-light dark:text-darkmode-light">
                ({category.products.length})
              </span>
            </li>
          ))} */}
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className={`flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer`}
            >
              <div className="flex items-center w-full">
                <Printer className="size-4 mr-2" />
                <span className="text-sm font-medium text-gray-900  dark:text-white">
                  {category.name}
                </span>
              </div>
              <span className="group opacity-0   hover:opacity-100 transition-opacity duration-200">
                <ArrowRight className="size-4 ml-auto" />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Button
          onClick={resetFilters}
          className="text-light dark:text-darkmode-light"
          variant={"outline"}
        >
          <RefreshCcw /> Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
