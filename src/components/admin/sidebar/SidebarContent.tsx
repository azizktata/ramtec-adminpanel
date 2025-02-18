import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { navItems } from "@/constants/navItems";
import Typography from "../../ui/typography";

import { signOut } from "next-auth/react";
import { SignOut } from "@/components/shared/sign-out";
export default function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="pb-[5rem] h-full">
      <div className="py-6 px-2 flex flex-col overflow-y-auto h-full">
        <div className="flex items-center justify-start px-5">
          <Briefcase className="size-8 text-adminPrimary mb-1.5 " />
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "font-bold text-2xl px-4 gap-2 min-h-fit"
            )}
          >
            <Typography component="span">Admin</Typography>
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
      </div>

      <div className="px-6 py-4 absolute left-0 w-full right-0 bottom-0 border-t">
        <SignOut />
      </div>
    </div>
  );
}
