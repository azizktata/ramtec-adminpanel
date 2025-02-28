"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { CategoryWithSubCategories } from "@/types/category-with-products";
import { cn } from "@/lib/utils";
import { slugify } from "@/utils/slugify";

export default function TopBar() {
  const [categories, setCategories] = React.useState<
    CategoryWithSubCategories[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  // const [error, setError] = React.useState(false);
  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/subCategories", {
          next: { revalidate: 3600 },
        });
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch {}
    }
    fetchCategories();
  }, []);
  return (
    <header className="hidden sm:flex px-4 py-4 sm:px-2 lg:px-8 shadow-md rounded-bl-xl rounded-br-xl border-b border-[#F8F2D8]">
      <nav className="container mx-auto">
        {loading ? (
          <div className="h-10 bg-gray-200 animate-pulse w-full" />
        ) : (
          <NavigationMenu className="hidden sm:flex z-20 overflow-visible">
            <NavigationMenuList className="flex flex-wrap gap-3 items-center  justify-center">
              {categories
                // .filter((cat) => cat.subcategories.length > 0)
                .map((category) => (
                  <NavigationMenuItem key={category.id}>
                    <NavigationMenuTrigger key={category.id}>
                      {category.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-0">
                      {/* <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr] "> */}
                      <ul className="grid gap-3 p-6 md:w-[400px] overflow-visible z-20">
                        {category.subcategories.map((subCategory) => (
                          // <ListItem
                          //   key={cat.id}
                          //   href={`/products?c=${slugify(cat.name)}`}
                          //   title={cat.name}
                          //   >
                          //   </ListItem>
                          <ListItem
                            key={subCategory.id}
                            href={`/products?c=${slugify(subCategory.name)}`}
                            title={subCategory.name}
                            // subcategories={subCategory.subcategories}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </nav>
    </header>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="relative group">
      {/* Main Navigation Menu Item */}
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md px-3 py-2 leading-none border-l-2 border-storeAccent no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <p className="text-sm font-medium leading-none">{title}</p>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>

      {/* Submenu for Subcategories */}
      {/* {subcategories.length > 0 && (
        <div className="absolute left-[100px] top-[0px] mt-0 ml-2 w-[200px] bg-white shadow-md rounded-md p-2 border border-gray-200 z-50 hidden group-hover:block">
  
          <ul>
            {subcategories.map((subSubCategory) => (
              <li key={subSubCategory.id}>
                <NavigationMenuLink asChild>
                  <a
                    href={`/products?c=${slugify(subSubCategory.name)}`}
                    className="block p-2 rounded-md hover:bg-gray-100"
                  >
                    {subSubCategory.name}
                  </a>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </li>
  );
});
ListItem.displayName = "ListItem";
