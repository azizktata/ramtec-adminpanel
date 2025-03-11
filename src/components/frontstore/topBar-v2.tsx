"use client";
import { CategoryWithSubCategories } from "@/types/category-with-products";
import { slugify } from "@/utils/slugify";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TopBarV2() {
  const [categories, setCategories] = React.useState<
    CategoryWithSubCategories[]
  >([]);
  // const [loading, setLoading] = React.useState(true);
  // const [error, setError] = React.useState(false);
  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/subCategories", {
          next: { revalidate: 3600 },
        });
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(data);
        // setLoading(false);
      } catch {}
    }
    fetchCategories();
  }, []);
  const [activeCategory, setActiveCategory] =
    React.useState<CategoryWithSubCategories>();
  const [openBar, setOpenBar] = React.useState(false);

  return (
    <nav className="bg-white shadow-md relative">
      <div className="container  mx-auto px-4">
        <div className="flex gap-2 items-center py-3">
          {/* Left Side - Categories */}
          <button
            onClick={() => setOpenBar((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 font-medium hover:text-storeAccent transition-color duration-200"
          >
            All Categories <ChevronDown className="size-4" />
          </button>
          <div>
            {/* <div className="relative group w-full"> */}
            {/* Dropdown Menu - Categories */}
            {/* <div className="absolute left-0 mt-2 w-64 z-20 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"> */}
            <div
              className={`absolute z-20 w-full left-0 top-16 w-full flex bg-[#f9fafb]  shadow-md opacity-0  transition-opacity duration-200 ${
                openBar ? "opacity-100" : "opacity-0 hidden"
              }`}
              onMouseLeave={() => {
                setActiveCategory(undefined);
                setOpenBar(false);
              }} // Close menu when leaving
            >
              {/* Left Category List */}
              <div className="w-1/3 bg-white shadow-lg rounded-none">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="p-3 cursor-pointer hover:bg-gray-200"
                    onMouseEnter={() => setActiveCategory(category)}
                  >
                    <span className="px-3 text-sm font-medium  py-2 border-l-2 border-storeAccent no-underline outline-none transition-colors hover:bg-accent">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subcategories Panel */}
              {activeCategory && (
                <div className="ml-4 w-full bg-transparent shadow-sm  p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {activeCategory.name}
                  </h3>
                  <div className="columns-3 items-start w-full gap-8">
                    {activeCategory.subcategories.map((sub, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1  gap-2 py-2 "
                      >
                        {/* Subcategory name */}
                        <div className="text-sm text-gray-600 font-medium hover:text-blue-500 cursor-pointer">
                          <Link href={`/products?c=${slugify(sub.name)}`}>
                            {sub.name}
                          </Link>
                        </div>

                        {/* Subsubcategories - these should also flow to the next row */}
                        <div className="grid grid-cols-1 gap-x-8 gap-y-2">
                          {sub.subcategories.map((subsub, subsubIndex) => (
                            <div
                              key={subsubIndex}
                              className="text-xs text-gray-600 flex flex-col hover:text-blue-500 cursor-pointer"
                            >
                              <Link
                                href={`/products?c=${slugify(subsub.name)}`}
                              >
                                {subsub.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex space-x-12 text-gray-700 font-medium text-sm">
            {[
              "Electromenager",
              "Gaming",
              "Camera de surveilllance",
              "Imprimantes",
            ].map((item, index) => (
              <a
                key={index}
                href={`/products?c=${slugify(item)}`}
                className="hover:text-blue-500"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Center - Navigation Links */}
      </div>
    </nav>
    // <div className="relative">

    //   <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
    //     <div className="text-lg font-bold">My Store</div>
    //     <div className="space-x-6">
    //       <a href="#" className="text-gray-600 hover:text-blue-500">
    //         Best Sellers
    //       </a>
    //       <a href="#" className="text-gray-600 hover:text-blue-500">
    //         Gift Cards
    //       </a>
    //       <a href="#" className="text-gray-600 hover:text-blue-500">
    //         Top Deals
    //       </a>
    //       <a href="#" className="text-gray-600 hover:text-blue-500">
    //         New Releases
    //       </a>
    //     </div>
    //   </nav>

    //   <div
    //     className="absolute z-20 left-0 top-12 w-full flex bg-gray-100 p-4 shadow-md"
    //     onMouseLeave={() => setActiveCategory(undefined)} // Close menu when leaving
    //   >

    //     <div className="w-64 bg-white shadow-lg rounded-lg">
    //       {categories.map((category) => (
    //         <div
    //           key={category.name}
    //           className="p-3 cursor-pointer hover:bg-gray-200"
    //           onMouseEnter={() => setActiveCategory(category)}
    //         >
    //           {category.name}
    //         </div>
    //       ))}
    //     </div>

    //     {activeCategory && (
    //       <div className="ml-4 w-[600px] bg-white shadow-lg rounded-lg p-4">
    //         <h3 className="text-lg font-semibold text-gray-700 mb-2">
    //           {activeCategory.name}
    //         </h3>
    //         <div className="grid grid-cols-3 gap-4">
    //           {activeCategory.subcategories.map((sub, index) => (
    //             <div
    //               key={index}
    //               className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer"
    //             >
    //               {sub.name}
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}
