"use client";

import React from "react";
import { Menu } from "lucide-react";

import { useAppContext } from "@/context/App";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SidebarContent from "../sidebar/SidebarContent";
// import SidebarContent from "@/containers/sidebar/SidebarContent";

export default function NavMenuToggle() {
  const { toggleSidebar } = useAppContext();

  //   if (!windowWidth) return null;

  //   if (windowWidth >= 1024) {
  //     return (
  //       <Button variant="ghost" size="icon" onClick={toggleSidebar}>
  //         <Menu />
  //       </Button>
  //     );
  //   }

  return (
    <>
      <div className="hidden lg:block">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu />
        </Button>
      </div>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-full !max-w-sidebar bg-white p-0"
          >
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription>
                {/* Make changes to your profile here. Click save when you're done. */}
              </SheetDescription>
            </SheetHeader>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
