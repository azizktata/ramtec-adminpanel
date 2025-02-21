"use client";
import { ProductALL } from "@/types/products-IncludeAll";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import Link from "next/link";

export default function ProductDetails({ product }: { product: ProductALL }) {
  const dispatch = useAppDispatch();

  const [count, setCount] = React.useState(1);

  const addCount = () => {
    setCount((prev) => prev + 1);
  };

  const minusCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };
  return (
    <div className="flex flex-col items-start">
      <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        {product?.name}
      </h1>
      {/* <div className="flex justify-between items-center w-full mb-2">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          {product?.name}
        </h1>
        {product?.status === "SELLING" ? (
          <span className="text-green-500 text-sm flex items-center gap-1">
            In Stock
            <CheckCircle size={16} />
          </span>
        ) : (
          <span className="text-red-500 text-sm flex items-center gap-1">
            <StopCircle size={16} />
            Out of stock
          </span>
        )}
      </div> */}
      <div className="flex w-full   items-center gap-x-2 mt-8  mb-12">
        {product?.prices?.discount !== 0 && product?.prices?.discount ? (
          <div className="flex items-center justify-between w-full ">
            <div className="flex items-center gap-2">
              <p className="text-2xl  text-gray-600 linethrough line-through dark:text-white">
                {product?.prices?.price} TND
              </p>
              <span className="text-base md:text-2xl lg:text-3xl tracking-wider font-extrabold text-[#0188CC] dark:text-darkmode-dark">
                {product?.prices?.price -
                  (product?.prices?.price * product?.prices?.discount) /
                    100}{" "}
                TND
              </span>
            </div>

            <div className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md">
              {product?.prices?.discount}% OFF
            </div>
          </div>
        ) : (
          <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
            {product?.prices?.price} TND
          </p>
        )}
      </div>

      <div className="flex items-center  gap-4 mb-8 ">
        {/* <a
          onClick={() =>
            dispatch(addToCart({ item: product, quantity: count }))
          }
          href="#sidebar"
        >
          <Button>Add to cart</Button>
        </a> */}
        <a
          onClick={() =>
            dispatch(addToCart({ item: product, quantity: count }))
          }
          href="#sidebar"
        >
          <Button className="text-white  sm:mt-0 bg-storePrimary hover:bg-storePrimaryDark focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center">
            Add to cart
          </Button>
        </a>
        <Button
          onClick={() =>
            dispatch(addToCart({ item: product, quantity: count }))
          }
          className="bg-white text-storePrimary"
        >
          <Link href={`/checkout`}>Purchase Now</Link>
        </Button>
      </div>
      <div className="flex items-center gap-4 border rounded-md border-gray-300 p-1 px-4">
        <button onClick={minusCount}>
          <MinusIcon className="h-4 w-4 text-black-500 " />
        </button>
        <input
          id="counter"
          aria-label="input"
          className=" h-full text-center bg-primary border-r border-l border-gray-300 w-14 pb-1"
          type="text"
          value={count}
          onChange={(e) => e.target.value}
        />
        <button onClick={addCount}>
          <PlusIcon className="h-4 w-4 text-black-500" />
        </button>
      </div>
      <hr className=" dark:border-gray-800" />
      <div className="flex flex-wrap gap-3 items-center my-3">
        <h5 className="max-md:text-base font-semibold">Categories:</h5>
        {product?.category.map((cat) => cat.name).join(", ")}
      </div>

      <p className="mb-6 text-gray-500 dark:text-gray-400 py-6 mt-3 md:py-8 border-t border-gray-200">
        Studio quality three mic array for crystal clear calls and voice
        recordings. Six-speaker sound system for a remarkably robust and
        high-quality audio experience. Up to 256GB of ultrafast SSD storage.
      </p>
    </div>
  );
}
