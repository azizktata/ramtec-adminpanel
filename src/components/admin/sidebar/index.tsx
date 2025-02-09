"use client";
import React from "react";
import SidebarContent from "./SidebarContent";
import { useAppContext } from "@/context/App";

export default function Sidebar() {
  const { sidebarOpen } = useAppContext();
  return (
    sidebarOpen && (
      <aside className="hidden lg:block bg-popover h-dvh overflow-hidden flex-shrink-0 shadow-md relative z-40 w-sidebar">
        <SidebarContent />
      </aside>
    )
  );
}
