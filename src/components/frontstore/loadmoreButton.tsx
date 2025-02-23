"use client"; // ✅ Mark this as a Client Component

import { useState } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const LoadMoreButton = () => {
  const [coef, setCoef] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handleLoadMore = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("coef", (coef + 1).toString());
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    setCoef((prev) => prev + 1); // ✅ Update state to trigger re-render
  };

  return (
    <>
      <Button
        className="self-center bg-storeSecondary"
        onClick={handleLoadMore}
      >
        Show More
      </Button>
    </>
  );
};

export default LoadMoreButton;
