"use client";
import { ProductALL } from "@/types/products-IncludeAll";
import { CheckCircle, MinusIcon, PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { Input } from "../ui/input";

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
      <div className="flex justify-between items-center w-full">
        <p className="text-3xl font-medium mb-4 tracking-wider">
          {product?.name}
        </p>
        {product?.status === "SELLING" ? (
          <span className="text-green-500 text-sm flex items-center gap-1">
            In Stock
            <CheckCircle size={16} />
          </span>
        ) : (
          <span className="">Out of stock</span>
        )}
      </div>
      <div className="flex w-full   items-center gap-x-2 mt-8 border-b  border-gray-300 pb-6">
        {product?.prices?.discount !== 0 && product?.prices?.discount ? (
          <div className="flex items-center justify-between w-full ">
            <div className="flex items-center gap-2">
              <span className="text-base  font-base text-gray-500 dark:text-darkmode-dark line-through">
                {product?.prices?.price} TND
              </span>
              <span className="text-base md:text-2xl lg:text-3xl tracking-wider font-medium text-[#0188CC] dark:text-darkmode-dark">
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
          <span className="text-base md:text-2xl lg:text-3xl font-medium text-[#0188CC] dark:text-darkmode-dark">
            {product?.prices?.price} TND
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 dark:text-darkmode-dark border-b  border-gray-300 w-full py-12 mb-8 lg:mb-16">
        {product?.description}
      </p>

      <div className="flex items-center  gap-4 mb-8 ">
        <div className="flex items-center gap-4 border rounded-md border-gray-300 p-2 px-4">
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

        <a
          onClick={() =>
            dispatch(addToCart({ item: product, quantity: count }))
          }
          href="#sidebar"
        >
          <Button>Add to cart</Button>
        </a>
        <Button className="bg-[#0188CC] text-white">Purchase Now</Button>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <h5 className="max-md:text-base font-semibold">Categories:</h5>
        {product?.category.map((cat) => cat.name).join(", ")}
      </div>
    </div>
  );
}
