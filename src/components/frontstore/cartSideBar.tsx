"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addQuantity,
  reduceQuantity,
  removeFromCart,
} from "@/store/slices/cartSlice";
import { Item } from "@/types/products-IncludeAll";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function CartSideBar() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const addCount = (item: Item) => {
    dispatch(addQuantity({ id: item.id }));
  };

  const minusCount = (item: Item) => {
    if (item.quantity! > 1) {
      dispatch(reduceQuantity({ id: item.id }));
    }
  };

  return (
    <div
      id="sidebar"
      className="fixed z-20 w-[75%] md:w-[45%] lg:w-[33%] h-screen top-0 right-0 bg-gray-100 transform translate-x-full  transition-transform duration-300"
    >
      <div className="flex flex-col  gap-8 p-8">
        <div className="flex justify-between border-b border-gray-300 pb-4">
          <h4>
            Cart{" "}
            <span className="bg-green-500 text-white text-xs font-bold  px-2 py-1 rounded-full">
              {cart.items.length}
            </span>
          </h4>
          <a href="#">
            <button id="toggleSidebar" className="close-btn">
              &times;
            </button>
          </a>
        </div>

        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <Image src={item.images[0].url} alt="" width={100} height={100} />
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-500">
                ${item.prices?.price} x {item.quantity}
              </p>
              <div className="flex items-center self-start gap-4 mt-auto border  border-gray-300 p-1">
                <button onClick={() => minusCount(item)}>
                  <MinusIcon className="h-4 w-4 text-black-500" />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => addCount(item)}>
                  <PlusIcon className="h-4 w-4 text-black-500" />
                </button>
              </div>
            </div>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => dispatch(removeFromCart({ id: item.id }))}
              className="ml-auto cursor-pointer "
            >
              <TrashIcon className=" text-black-500" />
            </Button>
          </div>
        ))}

        <div className="flex justify-between mt-auto border-t border-gray-300 pt-4">
          <p>Total: </p>
          <p>${cart.total}</p>
        </div>

        <Link className="w-[100%] " href="/checkout">
          <Button className="w-full py-6 text-lg bg-[#1C274C] hover:bg-[#277BE2] transition-colors ease-in-out duration-300">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
