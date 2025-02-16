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
import { ORDER_METHODS, ORDER_STATUSES } from "@/constants/orders";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function OrderFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const perPageValue = searchParams.get("perPage") || "5";
  const startDateValue = searchParams.get("startDate") || undefined;
  const endDateValue = searchParams.get("endDate") || undefined;

  const [startDate, setStartDate] = React.useState<Date | undefined>(
    startDateValue ? new Date(startDateValue) : undefined
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    endDateValue ? new Date(endDateValue) : undefined
  );
  function handleDate() {
    const params = new URLSearchParams(searchParams.toString());
    if (startDate) {
      params.set("startDate", format(startDate, "yyyy-MM-dd"));
    } else {
      params.delete("startDate");
    }
    if (endDate) {
      params.set("endDate", format(endDate, "yyyy-MM-dd"));
    } else {
      params.delete("endDate");
    }
    router.push(`${pathname}?${params.toString()}`); // }
  }
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
    setStartDate(undefined);
    setEndDate(undefined);
  }
  return (
    <Card className="mb-5">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4 lg:gap-6">
          <div className="md:basis-[35%] flex flex-col gap-2">
            <Label className="text-muted-foreground font-norma l">
              Start date
            </Label>
            <Popover>
              <PopoverTrigger className="bg-[#F9FAFB]" asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal h-12"
                >
                  <CalendarIcon />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a startDate</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="md:basis-[35%] flex flex-col gap-2">
            <Label className="text-muted-foreground font-normal">
              End date
            </Label>
            <Popover>
              <PopoverTrigger className="bg-[#F9FAFB]" asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal h-12"
                >
                  <CalendarIcon />
                  {endDate ? (
                    format(endDate, "PPP")
                  ) : (
                    <span>Pick a endDate</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-4 md:basis-[30%]">
            <Button onClick={handleDate} size="lg" className="h-12 flex-grow">
              Filter
            </Button>
            <Button
              onClick={resetFilters}
              size="lg"
              variant="secondary"
              className="h-12 flex-grow"
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:items-center mt-6 md:flex-row gap-4 lg:gap-6">
          <Select
            name="status"
            onValueChange={(value) => handleChange("status", value)}
          >
            <SelectTrigger className="capitalize md:basis-1/5 h-12  bg-[#F9FAFB]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="none">Status</SelectItem>
              {ORDER_STATUSES.map((status) => (
                <SelectItem value={status} key={status} className="capitalize">
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            name="limit"
            onValueChange={(value) => handleChange("limit", value)}
          >
            <SelectTrigger className="md:basis-1/5 h-12">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="none">Limit</SelectItem>
              <SelectItem value="5">Last 5 days</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
            </SelectContent>
          </Select>

          <Select
            name="method"
            onValueChange={(value) => handleChange("method", value)}
          >
            <SelectTrigger className="capitalize md:basis-1/5 h-12">
              <SelectValue placeholder="Method" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="none">Method</SelectItem>
              {ORDER_METHODS.map((method) => (
                <SelectItem value={method} key={method} className="capitalize">
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => handleChange("perPage", value)}
            name="perPage"
            value={perPageValue}
          >
            <SelectTrigger className="md:basis-[10%] h-12">
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
        <div className="flex ">
          <Input
            type="search"
            placeholder="Search orders by invoiceNo, customer name..."
            className="h-12 md:basis-[40%] bg-[#F9FAFB]"
            name="search"
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
}
