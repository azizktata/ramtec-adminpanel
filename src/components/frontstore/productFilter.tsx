"use client";

import { CategoryWithProductsIds } from "@/types/category-with-products";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { DualRangeSlider } from "../ui/dual-range-slider";
import React from "react";
import { Button } from "../ui/button";
import { ChevronUp, RefreshCcw } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Input } from "../ui/input";
// import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "../ui/checkbox";
import { MarqueWithProducts } from "@/types/marques";

const ProductFilters = ({
  categories,
  marques,
  maxPriceData,
}: {
  categories: CategoryWithProductsIds[];
  marques: MarqueWithProducts[];
  maxPriceData: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>(
    []
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) // Collapse if already expanded
          : [...prev, categoryId] // Expand if not already expanded
    );
  };
  //   const selectedBrands = searchParams.getAll("b");
  const selectedCategories = searchParams.getAll("c"); // Get all selected categories

  // const [loadingC, setLoadingC] = React.useState(false);
  // const [loadingM, setLoadingM] = React.useState(false);
  const handleCategoryClick = (handle: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const selectedCategories = newParams.getAll("c"); // Get all selected categories

    if (selectedCategories.includes(handle)) {
      // Remove category if already selected
      newParams.delete("c"); // Remove all instances
      selectedCategories
        .filter((c) => c !== handle)
        .forEach((c) => newParams.append("c", c)); // Re-add remaining categories
    } else {
      // Add new category to selection
      newParams.append("c", handle);
    }
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const handleMarqueClick = (handle: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const selectedMarques = newParams.getAll("m");

    if (selectedMarques.includes(handle)) {
      newParams.delete("m");
      selectedMarques
        .filter((m) => m !== handle)
        .forEach((m) => newParams.append("m", m));
    } else {
      newParams.append("m", handle);
    }

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };
  const minPriceParam = Number(searchParams.get("minPrice")) || 0;
  const maxPriceParam = Number(searchParams.get("maxPrice")) || 0;
  const [minPrice, setMinPrice] = React.useState(minPriceParam);
  const [maxPrice, setMaxPrice] = React.useState(maxPriceParam);
  function resetFilters() {
    router.push(pathname, { scroll: false });
  }
  function resetPriceFilters() {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("minPrice");
    setMinPrice(0);

    newParams.delete("maxPrice");
    setMaxPrice(maxPriceData);
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }
  function resetCategoryFilters() {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("c");
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }
  function resetMarqueFilters() {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("m");
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }

  const handlePreventEventClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent closing of the dropdown
  };
  // const handleCategoryClick = (handle: string) => {
  //   const newParams = new URLSearchParams(searchParams.toString());

  //   if (handle === selectedCategory) {
  //     newParams.delete("c");
  //   } else {
  //     newParams.set("c", handle);
  //   }
  //   router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  // };
  // function resetFilters() {
  //   router.push(pathname, { scroll: false });
  //   setValues([0, maxPriceData]);
  // }

  const handlePriceChange = (type: "min" | "max", value: number) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newParams.set(type === "min" ? "minPrice" : "maxPrice", value.toString());
    } else {
      newParams.delete(type === "min" ? "minPrice" : "maxPrice");
    }

    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  // const [values, setValues] = React.useState([0, maxPriceData]);
  // function handleSliderChange(value: number[]) {
  //   const params = new URLSearchParams(searchParams.toString());

  //   if (value[0] !== 0) {
  //     params.set("minPrice", value[0].toString());
  //   } else {
  //     params.delete("minPrice");
  //   }
  //   if (value[1] !== maxPriceData) {
  //     params.set("maxPrice", value[1].toString());
  //   } else {
  //     params.delete("maxPrice");
  //   }
  //   router.push(`${pathname}?${params.toString()}`); // }
  // }

  return (
    <div className="  w-full flex flex-col sm:flex-row   items-stretch md:items-center gap-4 ">
      {/* <div id="price-range">
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
      </div> */}

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

      <div id="categories">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between gap-8 h-10  "
            >
              {selectedCategories.length > 0
                ? `${selectedCategories.length} categories selected`
                : "Categories"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="ml-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-82 h-96 overflow-y-auto p-2 space-y-1"
          >
            <div className="flex  justify-end px-2 border-b border-gray-200 mb-3 pb-3">
              {/* <span className="text-sm text-gray-700">
                Total products <strong>{numberOfProducts}</strong>
              </span> */}
              <Button
                variant="link"
                onClick={resetCategoryFilters}
                className="text-sm font-base text-gray-800"
              >
                Reset
              </Button>
            </div>

            {categories
              .filter((category) => !category.parentId)
              .map((parent) => {
                const subcategories = categories.filter(
                  (category) => category.parentId === parent.id
                );

                return (
                  <div key={parent.id}>
                    {/* Parent Category */}
                    <DropdownMenuItem
                      onClick={(e) => {
                        toggleCategory(parent.id);
                        e.preventDefault();
                      }}
                      className="flex items-center gap-x-12 py-2 justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          name="categories"
                          value={parent.id}
                          defaultChecked={searchParams
                            .getAll("c")
                            .includes(parent.slug)}
                          onClick={(e) => {
                            handleCategoryClick(parent.slug);
                            handlePreventEventClick(e);
                          }}
                          id={parent.id}
                        />

                        <span className="text-xs font-semibold text-gray-800">
                          {parent.name}
                        </span>
                      </div>
                      <span className="text-gray-500">
                        {expandedCategories.includes(parent.id) ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </span>
                    </DropdownMenuItem>

                    {/* Subcategories (Only show when expanded) */}
                    {expandedCategories.includes(parent.id) &&
                      subcategories.map((child) => {
                        const subSubcategories = categories.filter(
                          (category) => category.parentId === child.id
                        );

                        return (
                          <div key={child.id} className="pl-4">
                            <DropdownMenuItem
                              onClick={() => {
                                handleCategoryClick(child.slug);
                              }}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Checkbox
                                name="categories"
                                value={child.id}
                                defaultChecked={searchParams
                                  .getAll("c")
                                  .includes(child.slug)}
                                onClick={() => {
                                  handleCategoryClick(child.slug);
                                }}
                                id={child.id}
                              />

                              <span className="text-xs font-medium text-gray-700">
                                {child.name} ({child.products.length}+)
                              </span>
                            </DropdownMenuItem>

                            {/* Sub-Subcategories */}
                            {subSubcategories.length > 0 &&
                              subSubcategories.map((subChild) => (
                                <DropdownMenuItem
                                  key={subChild.id}
                                  onClick={() => {
                                    handleCategoryClick(subChild.slug);
                                  }}
                                  className="flex items-center gap-2 cursor-pointer pl-6"
                                >
                                  <Checkbox
                                    name="categories"
                                    value={subChild.id}
                                    defaultChecked={searchParams
                                      .getAll("c")
                                      .includes(subChild.slug)}
                                    onClick={() => {
                                      handleCategoryClick(subChild.slug);
                                    }}
                                    id={subChild.id}
                                  />
                                  <span className="text-xs text-gray-600">
                                    {subChild.name}
                                  </span>
                                </DropdownMenuItem>
                              ))}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* <h5 className="mb-2 mt-4 text-base lg:text-lg font-semibold  border-b border-gray-200 pb-3 ">
          Categories
        </h5>
        <ul className="mt-4 space-y-4 w-full">
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
        </ul> */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-between h-10 gap-8"
          >
            Price
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4">
          <header className="flex items-center justify-between border-b border-gray-200 mb-3 pb-3">
            <span className="text-sm text-gray-700">
              Highest price is <strong>{maxPriceData}</strong>
              TND
            </span>
            <Button
              variant="link"
              onClick={resetPriceFilters}
              className="text-sm"
            >
              Reset
            </Button>
          </header>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="minPrice" className="text-sm text-gray-600">
                Min Price
              </label>
              <Input
                id="minPrice"
                type="number"
                placeholder="Min"
                value={minPrice || ""}
                onChange={(e) => {
                  setMinPrice(Number(e.target.value));
                  handlePriceChange("min", Number(e.target.value));
                }}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="maxPrice" className="text-sm text-gray-600">
                Max Price
              </label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="Max"
                value={maxPrice || ""}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  handlePriceChange("max", Number(e.target.value));
                }}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between gap-8 h-10"
            >
              Marques
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="ml-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72 p-2 space-y-1">
            <div className="flex justify-between items-center px-2 border-b border-gray-200 mb-3 pb-3">
              <span className="text-sm text-gray-700">
                total marques <strong>{marques.length}</strong>
              </span>
              <Button
                variant={"link"}
                onClick={resetMarqueFilters}
                className="text-sm font-base self-start text-gray-800"
              >
                Reset
              </Button>
            </div>
            {marques.map((marque) => {
              const isChecked = searchParams.getAll("m").includes(marque.name);
              return (
                <DropdownMenuItem
                  key={marque.id}
                  onClick={() => {
                    handleMarqueClick(marque.name);
                    // handlePreventEventClick(e);
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    name="marques"
                    value={marque.id}
                    checked={isChecked}
                    onChange={() => {
                      handleMarqueClick(marque.name);
                    }}
                    id={marque.id}
                  />
                  <span className="text-xs font-medium text-gray-700">
                    {marque.name} ({marque.products.length}+)
                  </span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="sm:hidden md:flex">
        <Button
          onClick={resetFilters}
          className="text-light dark:text-darkmode-light"
          variant={"outline"}
        >
          <RefreshCcw />
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
