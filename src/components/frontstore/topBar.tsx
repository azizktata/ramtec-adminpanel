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

import { CategoryWithProductsIds } from "@/types/category-with-products";
import { cn } from "@/lib/utils";
import { slugify } from "@/utils/slugify";

export default function TopBar() {
  const [categories, setCategories] = React.useState<CategoryWithProductsIds[]>(
    []
  );
  const [loading, setLoading] = React.useState(true);
  // const [error, setError] = React.useState(false);
  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/parentCategories", {
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
    <header className="hidden sm:flex px-4 py-4 sm:px-6 lg:px-8 shadow-md rounded-bl-xl rounded-br-xl border-b border-[#F8F2D8]">
      <nav className="container mx-auto">
        {loading ? (
          <div className="h-10 bg-gray-200 animate-pulse w-full" />
        ) : (
          <NavigationMenu className="hidden sm:flex">
            <NavigationMenuList>
              {categories
                // .filter((cat) => cat.subcategories.length > 0)
                .map((category) => (
                  <NavigationMenuItem key={category.id}>
                    <NavigationMenuTrigger key={category.id}>
                      {category.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]">
                        {category.subcategories.map((cat) => (
                          <ListItem
                            key={cat.id}
                            href={`/products?c=${slugify(cat.name)}`}
                            title={cat.name}
                          >
                            {/* <span className="text-gray-500">
                            {cat.description
                              ? cat.description
                              : "No description"}
                          </span> */}
                          </ListItem>
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
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md px-3 py-2 leading-none  border-l-2 border-storeAccent rounded-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
