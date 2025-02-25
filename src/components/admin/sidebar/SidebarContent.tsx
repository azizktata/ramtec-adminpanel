import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { navItems } from "@/constants/navItems";

import { SignOut } from "@/components/shared/sign-out";
import Image from "next/image";
import { ArrowLeftCircleIcon } from "lucide-react";
export default function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="pb-6 h-full">
      <div className="pt-6 px-2 flex flex-col overflow-y-auto h-full">
        <div className="flex items-center justify-start ">
          <Link
            href="/admin/dashboard"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "font-bold text-2xl px-4 gap-2 min-h-fit"
            )}
          >
            <Image src="/logo.png" width={150} height={100} alt="logo" />
          </Link>
        </div>

        <ul className="pt-6 flex flex-col gap-y-2">
          {navItems.map((navItem, index) => (
            <li key={`nav-item-${index}`}>
              <Link
                href={navItem.url}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "relative w-full justify-start px-5 py-6 gap-x-2.5 [&_svg]:size-6 [&_svg]:flex-shrink-0 font-medium text-base",
                  pathname === navItem.url &&
                    "after:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:w-1 after:bg-adminPrimary after:rounded-r-lg"
                )}
              >
                {navItem.icon} {navItem.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-4 py-4 mt-auto justify-center border-t flex flex-col items-stretch gap-2">
          <Button className="flex items-center justify-center  gap-1">
            <ArrowLeftCircleIcon className="size-8 text-white" />
            <Link href="/">Back to home</Link>
          </Button>
          <SignOut />
        </div>
      </div>
    </div>
  );
}
