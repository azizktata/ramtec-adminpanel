import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function PromotionalAd() {
  return (
    <section className="bg-white antialiased dark:bg-gray-900">
      <div className="mx-auto grid container rounded-lg bg-gray-50 dark:bg-gray-800 lg:grid-cols-12 lg:gap-0">
        {/* Left Side - Full Height Image */}
        <div className="lg:col-span-5 h-[400px] relative">
          <Image
            src="/hero (1).jpg"
            alt="peripherals"
            fill
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Content */}
        <div className="p-4 md:p-8 lg:p-16 xl:gap-16 me-auto  self-stretch  bg-[#07242C] lg:col-span-7">
          <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight  text-white md:text-4xl">
            Upgrade Your Office with the Best Printers!
          </h1>
          <p className="mb-6 text-gray-200">
            Enjoy high-quality prints, speed, and efficiency with our range of
            printers. Whether for your office or home, we have the perfect model
            to fit your needs. Shop now and get exclusive discounts.
          </p>
          <Button
            className="text-base px-9 py-6 bg-storeSecondary rounded-none"
            variant="default"
          >
            <Link href="/products">Shop Printers</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
