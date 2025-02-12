"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductFilters({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filterValue = searchParams.get("filter") || "";
  const categoryValue = searchParams.get("category") || "";
  const perPageValue = searchParams.get("perPage") || "5";
  function handleChange(name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value !== "none") {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`${pathname}?${params.toString()}`); // }
  }
  function resetFilters() {
    router.push(pathname, { scroll: false });
  }
  return (
    <Card className="mb-5">
      <div className="flex flex-col md:items-center md:flex-row gap-4 lg:gap-6">
        <Input
          type="search"
          placeholder="Search product by name, sku..."
          className="h-12 md:basis-[30%]"
          name="search"
          onChange={(e) => handleChange("search", e.target.value)}
        />

        <Select
          onValueChange={(value) => handleChange("category", value)}
          name="category"
          value={categoryValue}
        >
          <SelectTrigger className="md:basis-1/5 h-12">
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem className="text-gray-200" value="none">
              Category
            </SelectItem>

            {categories.map((category) => (
              <SelectItem key={category.slug} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleChange("filter", value)}
          name="filter"
          value={filterValue}
        >
          <SelectTrigger className="md:basis-1/5 h-12">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem className="text-gray-200" value="none">
              Fitler
            </SelectItem>
            <SelectItem value="low">Low to High</SelectItem>
            <SelectItem value="high">High to Low</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="unpublished">Unpublished</SelectItem>
            <SelectItem value="status-selling">Status - Selling</SelectItem>
            <SelectItem value="status-out-of-stock">
              Status - Out of Stock
            </SelectItem>
            <SelectItem value="date-added-asc">Date Added (Asc)</SelectItem>
            <SelectItem value="date-added-desc">Date Added (Desc)</SelectItem>
            <SelectItem value="date-updated-asc">Date Updated (Asc)</SelectItem>
            <SelectItem value="date-updated-desc">
              Date Updated (Desc)
            </SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => handleChange("perPage", value)}
          name="perPage"
          value={perPageValue}
        >
          <SelectTrigger className="md:basis-[15%] h-12">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem className="text-gray-200" value="none">
              page
            </SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-wrap sm:flex-nowrap gap-4 md:basis-[20%]">
          <Button
            onClick={resetFilters}
            size="lg"
            variant="secondary"
            className="flex-grow"
          >
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}
