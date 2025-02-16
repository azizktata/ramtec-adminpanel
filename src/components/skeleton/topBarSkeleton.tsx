import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function TopBarSkeleton() {
  return (
    <div className=" px-4 py-6 sm:px-6 lg:px-8 border-b border-accent-foreground">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-[200px] " />
            <Skeleton className="h-4 w-[200px] " />
            <Skeleton className="h-4 w-[200px] " />
            <Skeleton className="h-4 w-[200px] " />
          </div>
        </div>
      </div>
    </div>
  );
}
