"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  FacebookIcon,
  InstagramIcon,
  ShoppingBag,
  X,
  YoutubeIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Link from "next/link";
import { NotificationCount } from "../shared/notificationCount";
import { useAppSelector } from "@/store/hooks";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { SignOut } from "../shared/sign-out";
import { CategoryWithProducts } from "@/types/category-with-products";
import SearchBar from "./searchBar";
export default function MobileNavSlider({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const numberOfItems = useAppSelector((state) => state.cart.items.length);
  const { data: session, status } = useSession();
  const isLogged = session?.user;
  const userRole = session?.user?.role;
  const [categories, setCategories] = React.useState<CategoryWithProducts[]>(
    []
  );
  // const [error, setError] = React.useState(false);
  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories", {
          next: { revalidate: 3600 },
        });
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(data);
      } catch {}
    }
    fetchCategories();
  }, []);
  return (
    <div className="">
      <div className="flex h-full flex-col justify-between bg-white p-6">
        {/* top section */}
        <div className="flex flex-col gap-4">
          {/* logo */}
          <div className="flex items-center justify-between">
            <p>Logo</p>

            <button onClick={() => setOpen(false)}>
              <X className="w-6" />
            </button>
          </div>

          {/* search input */}
          <div className="flex h-12 items-center gap-2  ">
            <SearchBar />
          </div>
          {/* navbar links */}
          <Accordion className="grid grid-cols-1" type="single" collapsible>
            {categories.map((categorie) => (
              <AccordionItem value={categorie.name} key={categorie.id}>
                <AccordionTrigger>{categorie.name}</AccordionTrigger>
                {categorie.products.map((product) => (
                  <AccordionContent className="pl-4" key={product.id}>
                    <Link href={`/products/${product.slug}`}>
                      {product.name}
                    </Link>
                  </AccordionContent>
                ))}
              </AccordionItem>
            ))}
          </Accordion>

          {/* <ul className="grid grid-cols-1">
            {categories.map((categorie) => (
              <li
                key={categorie.id}
                className="border-b border-[#E8ECEF] first:pt-0"
              >
                <p className="block py-4 font-inter text-sm font-medium text-[#141718]">
                  {categorie.name}
                </p>
              </li>
            ))}
          </ul> */}
        </div>

        {/* bottom section */}
        <div className="flex flex-col gap-5">
          {/* cart & wishlist */}
          <ul>
            <li>
              <div className="flex items-center justify-between border-b border-[#E8ECEF] py-4">
                {status === "loading" ? (
                  <Skeleton className="h-9 w-30 rounded-sm" /> // Placeholder while loading
                ) : isLogged ? (
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {session.user.name?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                ) : null}

                <div className="relative flex items-center gap-1.5">
                  {userRole === "ADMIN" && (
                    <Button>
                      <Link href="/admin/dashboard">Admin</Link>
                    </Button>
                  )}
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between border-b border-[#E8ECEF] py-4">
                <span className="font-inter text-sm font-medium text-[#141718]">
                  Cart
                </span>

                <div className="relative flex items-center gap-1.5">
                  <ShoppingBag className="w-6" />
                  <div className="absolute bottom-4 left-4">
                    <NotificationCount count={numberOfItems} />
                  </div>
                </div>
              </div>
            </li>

            {/* <li>
              <Link
                href="/cart"
                className="flex items-center justify-between border-b border-[#E8ECEF] py-4"
              >
                <span className="font-inter text-sm font-medium text-[#141718]">
                  Wishlist
                </span>

                <div className="flex items-center gap-1.5">
                  <WishlistIcon className="w-6" />
                  <NotificationCount count={12} />
                </div>
              </Link>
            </li> */}
          </ul>

          {/* login button */}
          <div className=" items-center gap-4">
            {status === "loading" ? (
              <Skeleton className="h-9 w-30 rounded-sm" /> // Placeholder while loading
            ) : isLogged ? (
              <SignOut />
            ) : (
              <Button asChild className="w-full" variant={"outline"}>
                <Link href="/sign-in" className="w-full">
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* social media button */}
          <div className="flex items-center gap-6">
            <InstagramIcon className="w-6" />
            <FacebookIcon className="w-6" />
            <YoutubeIcon className="w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
