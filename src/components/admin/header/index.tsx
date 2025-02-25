"use client";

import Container from "@/components/ui/container";
// import { Skeleton } from "@/components/ui/skeleton";
// import ThemeToggle from "@/containers/header/ThemeToggle";
// import NavMenuToggle from "@/containers/header/NavMenuToggle";
// import Notifications from "@/containers/header/Notifications";
// import Profile from "@/containers/header/Profile";
import useGetMountStatus from "@/hooks/useGetMountStatus";
import NavMenuToggle from "./NavMenuToggle";
import { Skeleton } from "../../ui/skeleton";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const mounted = useGetMountStatus();

  return (
    <header className="sticky top-0 left-0 w-full bg-white py-4 shadow-sm z-40">
      <Container>
        <div className="flex justify-between">
          {mounted ? (
            <NavMenuToggle />
          ) : (
            <Skeleton className="size-10 rounded-full" />
          )}

          <div className="flex items-center gap-x-2 ml-auto">
            <Briefcase className="size-8 text-adminPrimary mb-1.5 " />
            <Link href="/admin/dashboard">
              <p className="text-lg font-semibold">Admin</p>
            </Link>
            {/* {mounted ? (
              <ThemeToggle />
            ) : (
              <Skeleton className="size-10 rounded-full" />
            )}

            <Notifications />
            <Profile /> */}
          </div>
        </div>
      </Container>
    </header>
  );
}
