"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isInputEditing, setInputEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const inputField = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    if (isInputEditing || searchParams.get("q")) {
      inputField.focus();
    }
  }, [searchParams, isInputEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEditing(true);
    setInputValue(e.target.value);

    const newParams = new URLSearchParams(searchParams.toString());

    if (e.target.value) {
      newParams.set("q", e.target.value);
    } else {
      newParams.delete("q");
    }

    router.push(`/products?${newParams}`, { scroll: false });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(`/products?${newParams}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`border border-border w-full dark:border-darkmode-border rounded-full flex bg-[#EFEFEF]  relative`}
    >
      <input
        id="searchInput"
        className="bg-transparent border-none search-input focus:ring-transparent pl-6 font-light w-full"
        key={searchParams?.get("q")}
        type="search"
        name="search"
        placeholder="Search for products"
        autoComplete="off"
        value={inputValue}
        onChange={handleChange}
      />

      <button className="bg-black text-white p-2 m-1 rounded-full">
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
