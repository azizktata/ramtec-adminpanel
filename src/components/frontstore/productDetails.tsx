"use client";
import { ProductALL } from "@/types/products-IncludeAll";
import { CheckCircle, MinusIcon, PlusIcon, StopCircle } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const isSeller = session?.user?.role === "SELLER";
  return (
    <div className="flex flex-col items-start">
      <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-2">
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

      <div className="flex w-full   items-center gap-x-2 mt-8  mb-12">
        {isSeller ? (
          product?.prices?.discountSeller !== 0 &&
          product?.prices?.discountSeller ? (
            <>
              <span className="text-base  font-base text-gray-500 dark:text-darkmode-dark line-through">
                {product?.prices?.price} <span className="">TND</span>
              </span>
              <span className="text-base md:text-xl font-medium text-storeSecondary dark:text-darkmode-dark">
                {product?.prices?.price -
                  (product?.prices?.price * product?.prices?.discountSeller) /
                    100}{" "}
                <span className="">TND</span>
              </span>
            </>
          ) : (
            <span className="text-base md:text-xl font-medium text-storeSecondary dark:text-darkmode-dark">
              {product?.prices?.price} <span className="TND">TND</span>
            </span>
          )
        ) : product?.prices?.discount !== 0 && product?.prices?.discount ? (
          <div className="flex items-center justify-between w-full ">
            <div className="flex items-center gap-2">
              <p className="text-xl  text-gray-500 linethrough line-through dark:text-white">
                {product?.prices?.price} <span className="">TND</span>
              </p>
              <span className="text-base md:text-2xl lg:text-3xl tracking-wider font-extrabold text-[#0188CC] dark:text-darkmode-dark">
                {product?.prices?.price -
                  (product?.prices?.price * product?.prices?.discount) /
                    100}{" "}
                <span className="">TND</span>
              </span>
            </div>

            <div className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md">
              {product?.prices?.discount}% OFF
            </div>
          </div>
        ) : (
          <p className="text-2xl font-extrabold text-storeSecondary sm:text-3xl dark:text-white">
            {product?.prices?.price} <span className="TND">TND</span>
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
          <Button className="text-white   sm:mt-0 bg-storeSecondary hover:bg-storePrimaryDark focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-base px-8 py-5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center">
            Add to cart
          </Button>
        </a>
        <Button
          onClick={() =>
            dispatch(addToCart({ item: product, quantity: count }))
          }
          className="bg-white text-storePrimary  hover:bg-gray-200 text-base px-8 py-5"
        >
          <Link href={`/checkout`}>Purchase Now</Link>
        </Button>
      </div>
      <div className="flex items-center gap-2 border border-gray-300 rounded-md shadow-sm p-1 bg-white">
        <button
          onClick={minusCount}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <MinusIcon className="h-5 w-5 text-gray-600" />
        </button>

        <input
          id="counter"
          aria-label="counter input"
          className="w-12 h-8 text-center text-lg font-medium text-gray-800 bg-transparent border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          value={count}
          onChange={(e) => e.target.value} // Consider handling the input change
        />

        <button
          onClick={addCount}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <PlusIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <hr className=" " />
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
