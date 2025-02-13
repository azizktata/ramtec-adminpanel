import React from "react";
import { links } from "@/constants/frontstore/navItems";
import { Button } from "../ui/button";
import {
  FacebookIcon,
  InstagramIcon,
  SearchIcon,
  ShoppingBag,
  X,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";
import { NotificationCount } from "../shared/notificationCount";
export default function MobileNavSlider({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
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
          <div className="flex h-12 items-center gap-2 rounded-md border border-[#6C7275] px-4">
            <label htmlFor="search" className="cursor-pointer">
              <SearchIcon />
            </label>
            <input
              id="search"
              name="search"
              className="font-inter text-sm font-normal text-[#141718] outline-none placeholder:opacity-70"
              placeholder="Search"
            />
          </div>
          {/* navbar links */}
          <ul className="grid grid-cols-1">
            {links.map((link) => (
              <li
                key={link.id}
                className="border-b border-[#E8ECEF] first:pt-0"
              >
                <Link
                  href={link.path}
                  className="block py-4 font-inter text-sm font-medium text-[#141718]"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* bottom section */}
        <div className="flex flex-col gap-5">
          {/* cart & wishlist */}
          <ul>
            <li>
              <Link
                href="/cart"
                className="flex items-center justify-between border-b border-[#E8ECEF] py-4"
              >
                <span className="font-inter text-sm font-medium text-[#141718]">
                  Cart
                </span>

                <div className="relative flex items-center gap-1.5">
                  <ShoppingBag className="w-6" />
                  <div className="absolute bottom-4 left-4">
                    <NotificationCount count={2} />
                  </div>
                </div>
              </Link>
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
          <Button size="lg" className="py-2.5">
            Sign In
          </Button>

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
