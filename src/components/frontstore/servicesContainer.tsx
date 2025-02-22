import { Headset, ShieldCheck, Truck } from "lucide-react";
import React from "react";

export default function ServicesContainer() {
  return (
    <div
      id="professionalism"
      className="flex flex-col md:flex-row items-start justify-center  md:w-full mx-auto gap-2 lg:gap-8 my-8 lg:my-16 "
    >
      <div
        id="card"
        className="flex md:flex-col gap-x-4  justify-center items-center   lg:w-1/3 px-4 md:px-8  py-8 rounded-lg"
      >
        <div className="w-20 h-20 bg-[#C4E8F7] rounded-full flex justify-center items-center shadow-md hover:scale-105 transition-all">
          <div className="w-16 h-16 bg-[#2DABE3] rounded-full flex justify-center items-center shadow-sm">
            <Truck size={32} color="#ffffff" strokeWidth={1.25} />
          </div>
        </div>

        <div className="md:text-center py-4 ">
          <h3 className="text-2xl md:text-xl font-medium text-gray-800 mb-2 ">
            Fast delivery
          </h3>
          <p className="text-gray-500 font-base">
            Fast delivery to your doorstep
          </p>
        </div>
      </div>
      <div
        id="card"
        className="flex md:flex-col gap-x-4  justify-center items-center   lg:w-1/3 px-4 md:px-8  py-8 rounded-lg"
      >
        <div className="w-20 h-20 bg-[#C4E8F7] rounded-full flex justify-center items-center shadow-md hover:scale-105 transition-all">
          <div className="w-16 h-16 bg-[#2DABE3] rounded-full flex justify-center items-center shadow-sm">
            <Headset size={40} color="#ffffff" strokeWidth={1.25} />
          </div>
        </div>
        <div className="md:text-center py-4 ">
          <h3 className="text-2xl md:text-xl font-medium text-gray-800 mb-2 ">
            24/7 Customer service
          </h3>
          <p className="text-gray-500 font-base">friendly customer service</p>
        </div>
      </div>
      <div
        id="card"
        className="flex md:flex-col gap-x-4 justify-center items-center   lg:w-1/3 px-4 md:px-8  py-8 rounded-lg"
      >
        <div className="w-20 h-20 bg-[#C4E8F7] rounded-full flex justify-center items-center shadow-md hover:scale-105 transition-all">
          <div className="w-16 h-16 bg-[#2DABE3] rounded-full flex justify-center items-center shadow-sm">
            <ShieldCheck size={40} color="#ffffff" strokeWidth={1.25} />
          </div>
        </div>
        <div className="md:text-center py-4 ">
          <h3 className="text-2xl md:text-xl font-medium text-gray-800 mb-2 ">
            Money back guranteed
          </h3>
          <p className="text-gray-500 font-base">100% money back guarantee</p>
        </div>
      </div>
    </div>
  );
}
