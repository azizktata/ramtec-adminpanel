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

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filterValue = searchParams.get("filter") || "";
  const perPageValue = searchParams.get("perPage") || "5";
  function handleChange(name: string, value: string) {
    // if (value !== 0) {
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 lg:gap-6">
        <Input
          type="search"
          placeholder="Search category by name..."
          className="h-12 md:basis-[30%]"
          name="search"
          onChange={(e) => handleChange("search", e.target.value)}
        />

        <div className="flex flex-wrap items-center sm:flex-nowrap gap-4 md:basis-[70%]">
          <Select
            onValueChange={(value) => handleChange("filter", value)}
            name="filter"
            value={filterValue}
          >
            <SelectTrigger className="md:basis-1/5 py-5">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="none">none</SelectItem>

              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="unpublished">Unpublished</SelectItem>

              <SelectItem value="date-added-asc">Date Added (Asc)</SelectItem>
              <SelectItem value="date-added-desc">Date Added (Desc)</SelectItem>
              <SelectItem value="date-updated-asc">
                Date Updated (Asc)
              </SelectItem>
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
            <SelectTrigger className="md:basis-1/6 py-5">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
