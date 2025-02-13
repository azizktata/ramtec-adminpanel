"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import MobileNavSlider from "./mobileNavSlider";
import { NotificationCount } from "../shared/notificationCount";

export default function Header() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center gap-2 justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <Link href="#" className="text-2xl font-bold text-[#3C50E0]">
            RAMTEC
          </Link>
          <NavigationMenu className="hidden sm:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Featured Product
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Check out our latest and greatest offering
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="#" title="Product 1">
                      Description for Product 1
                    </ListItem>
                    <ListItem href="#" title="Product 2">
                      Description for Product 2
                    </ListItem>
                    <ListItem href="#" title="Product 3">
                      Description for Product 3
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="#"
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="#"
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex hidden sm:flex items-center space-x-4 flex-grow max-w-[400px] ">
          <form className="relative flex-grow w-full flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-8 " />
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="hidden sm:flex" variant={"outline"}>
            Sign In
          </Button>
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-muted-foreground" />
            {/* <a href="#sidebar"></a> */}
            <div className="absolute bottom-4 left-4">
              {/* <span>{cart.items.length}</span> */}
              <NotificationCount count={2} className="text-white" />
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
