"use client";

import { CategoryWithProducts } from "@/types/category-with-products";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DualRangeSlider } from "../ui/dual-range-slider";
import React from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
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
    <div className="">
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
            label={(value) => <span>{value}TND</span>}
          />
        </div>
      </div>

      <div>
        <h5 className="mb-2 mt-4 text-base lg:text-lg font-semibold  border-b border-gray-200 pb-3 lg:text-xl">
          Product Categories
        </h5>

        <ul className="mt-4 space-y-4">
          {categories.map((category) => (
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
