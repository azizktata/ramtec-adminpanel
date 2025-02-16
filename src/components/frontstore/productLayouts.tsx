"use client";

import { Filter, FilterX, Grid, List } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCollapse } from "react-collapsed";
import { CategoryWithProducts } from "@/types/category-with-products";
import ProductFilters from "./productFilter";
export default function ProductLayouts({
  categories,
  maxPriceData,
}: {
  categories: CategoryWithProducts[];
  maxPriceData: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isListView = searchParams.get("layout") === "list";
  function handleLayoutChange(newLayout: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("layout", newLayout);
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }

  function handleChange(name: string, value: string) {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value !== "none") {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }
    router.push(`${pathname}?${newParams.toString()}`);
  }
  const sortValue = searchParams.get("sort") || "";

  const [isExpanded, setExpanded] = React.useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  return (
    <>
      <section className="pt-4">
        <div className="w-full">
          <div className="flex flex-col  w-full">
            <div className=" max-lg:hidden" />

            <div className="flex w-full gap-4 justify-between justify-center items-center  my-4">
              <div className="flex gap-x-4 items-center font-medium text-xs md:text-base">
                <p className="max-md:hidden text-dark dark:text-darkmode-dark">
                  Views
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleLayoutChange("grid")}
                    variant={isListView ? "outline" : "default"}
                    className={`btn border dark:border-darkmode-border  p-2 hover:scale-105 duration-300`}
                  >
                    <Grid />
                  </Button>
                  <Button
                    onClick={() => handleLayoutChange("list")}
                    variant={isListView ? "default" : "outline"}
                    className={`btn border dark:border-darkmode-border  p-2 hover:scale-105 duration-300`}
                  >
                    <List />
                  </Button>
                </div>
              </div>

              <div className="flex gap-x-4 items-center">
                {/* Filter Button Trigger */}
                <div className="block lg:hidden mt-1">
                  <Button
                    {...getToggleProps({
                      onClick: () =>
                        setExpanded((prevExpanded) => !prevExpanded),
                    })}
                    variant={"outline"}
                  >
                    {isExpanded ? (
                      <span className="font-medium text-base flex gap-x-1 items-center justify-center">
                        <FilterX /> Filter
                      </span>
                    ) : (
                      <span className="font-medium text-base flex gap-x-1 items-center justify-center">
                        <Filter /> Filter
                      </span>
                    )}
                  </Button>
                </div>
                {/* Filter Button Trigger End */}

                <div className="flex gap-x-4 items-center font-medium text-sm md:text-base ">
                  <Select
                    onValueChange={(value) => handleChange("filter", value)}
                    name="sort"
                    value={sortValue}
                  >
                    <SelectTrigger className="md:basis-1/5 ">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem className="text-gray-200" value="none">
                        Sort By
                      </SelectItem>
                      <SelectItem value="asc">Low to High</SelectItem>
                      <SelectItem value="desc">High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="col-12 lg:col-3">
              <div className="lg:block relative">
                <div className="block lg:hidden w-full">
                  <section
                    className="collapse-container-class z-20 bg-body dark:bg-darkmode-body w-full px-4 rounded-md"
                    {...getCollapseProps()}
                  >
                    <div className="pb-8">
                      <ProductFilters
                        categories={categories}
                        maxPriceData={maxPriceData}
                      />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
