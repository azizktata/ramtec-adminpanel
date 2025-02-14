"use client";
import React from "react";
import toast from "react-hot-toast";
import { ProductALL } from "@/types/products-IncludeAll";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/slices/cartSlice";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function OrderForm({
  showSelectQuantity,
  userInfo,
  product,
}: {
  showSelectQuantity?: boolean;
  userInfo?: {
    username: string;
    email: string;
    phone: string;
    address: string;
  };
  product?: ProductALL;
}) {
  const [countt, setCountt] = React.useState(1);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const addCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setCountt((prev) => prev + 1);
  };

  const minusCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (countt > 1) {
      setCountt((prev) => prev - 1);
    }
  };
  //   async function handleSubmit(formData: FormData) {
  //     let res;

  //     if (product) {
  //       res = await createOrder(formData, cart.total, [product]);
  //     } else {
  //       res = await createOrder(formData, cart.total, cart.items);
  //     }
  //     if (res) {
  //       if (res.success) {
  //         toast.success(res.message);
  //         dispatch(clearCart());
  //         setCountt(1);
  //       } else {
  //         toast.error(res.message);
  //       }
  //     }
  //   }

  return (
    <form
      className="flex flex-col gap-4 mt-4 lg:grid lg:grid-cols-[repeat(2,1fr)]"
      //   action={handleSubmit}
    >
      <div className="w-full">
        <label htmlFor="firstName" className="block mb-2.5">
          First Name <span className="text-red">*</span>
        </label>

        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Jhon"
          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
        />
      </div>

      <div className="w-full">
        <label htmlFor="lastName" className="block mb-2.5">
          Last Name <span className="text-red">*</span>
        </label>

        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Deo"
          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
        />
      </div>
      <div className="w-full">
        <label htmlFor="lastName" className="block mb-2.5">
          Email <span className="text-red">*</span>
        </label>
        <input
          defaultValue={userInfo?.email || ""}
          placeholder="Your Email"
          type="text"
          name="email"
          required
          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
        />
      </div>
      <div className="w-full">
        <label htmlFor="lastName" className="block mb-2.5">
          Phone <span className="text-red">*</span>
        </label>
        <input
          defaultValue={userInfo?.phone}
          placeholder="Phone number"
          type="number"
          name="phone"
          required
          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
        />
      </div>
      <div className="w-full">
        <label htmlFor="lastName" className="block mb-2.5">
          Address <span className="text-red">*</span>
        </label>
        <input
          defaultValue={userInfo?.address}
          placeholder="Your Address"
          type="text"
          name="address"
          required
          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
        />
      </div>

      {showSelectQuantity && (
        <div className="col-span-full lg:mt-11 mt-10">
          <div className="flex flex-row justify-between">
            <p className=" font-medium text-base leading-4 text-gray-600">
              Select quantity
            </p>
            <div className="flex gap-4 mt-auto border  border-gray-300 p-1">
              <button onClick={minusCount}>
                <MinusIcon className="h-4 w-4 text-black-500" />
              </button>
              <span>{countt}</span>
              <button onClick={addCount}>
                <PlusIcon className="h-4 w-4 text-black-500" />
              </button>
            </div>
          </div>
          <hr className=" bg-gray-200 w-full my-2" />
          {product && (
            <div className="flex justify-between">
              <p>Total: </p>
              <p>{product?.prices!.price * countt}DT</p>
            </div>
          )}
        </div>
      )}

      <Button
        type="submit"
        className="bg-[#0188CC] text-white col-span-full py-8 text-lg mt-8"
      >
        Purchase Now
      </Button>
    </form>
  );
}
