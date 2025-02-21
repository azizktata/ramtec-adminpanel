import OrderForm from "@/components/frontstore/orderForm";
import OrderSummary from "@/components/frontstore/orderSummary";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Slash } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <>
      <div className="flex  flex-col md:flex-row md:items-baseline gap-8 container mx-auto border-t border-solid ">
        <div className="md:w-[65%] pt-8">
          <div className="text-gray-500 mb-8">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link className="text-sm" href="/">
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Checkout</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <h3 className="text-bold mb-4 text-2xl">Checkout</h3>
          <OrderForm />
        </div>
        <OrderSummary />
      </div>
    </>
  );
}
