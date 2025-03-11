"use client";
import React from "react";

interface Spec {
  title: string;
  value: string;
}

export default function ProductSpec({
  description,
  specifications,
}: {
  description: string;
  specifications: Spec[];
}) {
  const [activeTab, setActiveTab] = React.useState("description");
  const handleTab = (tab: string) => {
    setActiveTab(tab);
    console.log(specifications[0].title);
  };
  const activeClass =
    activeTab === "description"
      ? "rounded-t-lg border-b-white border-gray-300 text-sky-600"
      : "border-transparent text-gray-500 hover:text-gray-700";
  const activeClass2 =
    activeTab === "specifications"
      ? "rounded-t-lg border-b-white border-gray-300 text-sky-600"
      : "border-transparent text-gray-500 hover:text-gray-700";
  return (
    <div className="w-full bg-[#F5F5F5] px-8 py-12 rounded-md mt-8">
      <div className="">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6">
            <p
              onClick={() => handleTab("description")}
              className={`shrink-0  border cursor-pointer  p-3 text-sm md:text-md font-medium  ${activeClass}`}
            >
              Description
            </p>

            {specifications && (
              <p
                onClick={() => handleTab("specifications")}
                className={`shrink-0  border cursor-pointer  p-3 text-sm md:text-md font-medium  ${activeClass2}`}
              >
                Specifications
              </p>
            )}
          </nav>
        </div>
      </div>
      {activeTab === "description" && (
        <div id="description" className="mt-6">
          <p className="text-base text-gray-500 dark:text-darkmode-dark">
            {description}
          </p>
        </div>
      )}
      {activeTab === "specifications" && specifications && (
        <div id="specifications" className=" mt-6">
          <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              {specifications.map((spec: Spec) => (
                <div
                  key={spec.title}
                  className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                >
                  <dt className="font-medium text-gray-900">{spec.title}</dt>
                  <dd className="text-gray-700 sm:col-span-2">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
