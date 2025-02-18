"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";

import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import MobileNavSlider from "./mobileNavSlider";
import { NotificationCount } from "../shared/notificationCount";
import { useAppSelector } from "@/store/hooks";
import SearchBar from "./searchBar";
import Image from "next/image";
import { SignOut } from "../shared/sign-out";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Header() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const session = useSession();
  const isLogged = session.data?.user;
  const userRole = session.data?.user?.role;

  const numberOfItems = useAppSelector((state) => state.cart.items.length);
  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center gap-2 justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center ">
          <Link href="/" className="flex w-[150px] ">
            <Image
              src="/logo.PNG"
              alt="Logo"
              width={150}
              height={150}
              priority
              className="cursor-pointer "
            />
          </Link>
        </div>
        <div className="flex hidden sm:flex items-center mx-6 flex-grow max-w-3xl ">
          <SearchBar />
        </div>
        <div className="flex items-center space-x-4">
          {userRole === "ADMIN" && (
            <Button>
              <Link href="/admin/dashboard">Admin</Link>
            </Button>
          )}

          {isLogged ? (
            <>
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {" "}
                  {session.data?.user.name?.slice(0, 2)}{" "}
                </AvatarFallback>
              </Avatar>
              <SignOut />
            </>
          ) : (
            <Button asChild className="hidden sm:flex" variant={"outline"}>
              <Link href="/sign-in" className="hidden sm:flex">
                Sign In
              </Link>
            </Button>
          )}
          <div className="relative">
            <a href="#sidebar">
              <ShoppingBag className="w-6 h-6 text-muted-foreground" />
            </a>
            {/* <a href="#sidebar"></a> */}
            <div className="absolute bottom-4 left-4">
              {/* <span>{cart.items.length}</span> */}
              <NotificationCount count={numberOfItems} className="text-white" />
            </div>
          </div>
          <Button
            variant={"outline"}
            onClick={handleToggleSidebar}
            className=" sm:hidden size-8 focus:outline-none"
          >
            {" "}
            {showSidebar ? (
              <X className="text-gray-800" />
            ) : (
              <Menu className="text-gray-800" />
            )}
          </Button>
        </div>
        <div
          className={`fixed top-0 left-0 h-full bg-black opacity-50 w-full ${
            showSidebar ? "block" : "hidden"
          }`}
          onClick={handleToggleSidebar}
        ></div>
        {/* <div
              className={`fixed top-0 left-0 h-full bg-white dark:bg-darkmode-body overflow-y-auto w-full md:w-96 p-9 ${showSidebar ? "transition-transform transform translate-x-0" : "transition-transform transform -translate-x-full"}`}
            > */}
        <div
          className={`absolute left-0 top-0 z-10 grid min-h-[100dvh] w-full grid-cols-[11fr_1fr] transition-transform duration-300 ease-in md:grid-cols-[10fr_2fr] md:w-96 ${
            showSidebar
              ? "transition-transform transform translate-x-0"
              : "transition-transform transform -translate-x-full"
          }`}
        >
          <MobileNavSlider setOpen={setShowSidebar} />
        </div>
      </div>
    </nav>
  );
}
