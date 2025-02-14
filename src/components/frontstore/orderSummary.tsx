"use client";

import { useAppSelector } from "@/store/hooks";
import React from "react";

export default function OrderSummary() {
  const cart = useAppSelector((state) => state.cart);

  return (
    <div className="w-[100%] md:w-[45%] bg-gray-100 border-l border-solid xs:h-auto md:h-screen">
      <div className="w-[90%] mx-auto  py-8">
        <h4 className="text-bold text-xl mb-4">Order summary</h4>
        <div className="flex flex-col gap-2 ">
          {cart.items.length > 0 &&
            cart.items.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <p className="font-medium">{item.name}</p>
                <p>
                  {item.prices!.price}${" "}
                  <span className="dt"> x {item.quantity}</span>
                </p>
              </div>
            ))}
          <div className="flex justify-between mt-6">
            <p className="font-normal">Subtotal ({cart.items.length} items) </p>
          </div>

          <div className="flex justify-between">
            <p className="font-normal">Shipping</p>
            <p>
              0 <span className="text-gray-400 font-light">DT</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p>
              <strong>Total </strong>
            </p>
            <p>
              <strong> {cart.total}</strong>
              <span className="text-gray-400 font-light"> DT</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
