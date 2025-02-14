import Billing from "@/components/frontstore/billingBox";
import Login from "@/components/frontstore/loginBox";
import OrderForm from "@/components/frontstore/orderForm";
import OrderSummary from "@/components/frontstore/orderSummary";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <div className="flex  flex-col md:flex-row md:items-baseline gap-8 container mx-auto border-t border-solid ">
        <div className="md:w-[65%] pt-8">
          <div className="text-gray-500 mb-8">
            <Link href={"/"}>Home </Link> /{" Checkout"}
          </div>
          <h3 className="text-bold mb-4 text-2xl">Checkout</h3>
          <OrderForm />
        </div>
        <OrderSummary />
      </div>
    </>
  );
}
