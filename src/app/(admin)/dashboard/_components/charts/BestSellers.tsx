"use client";

import { Pie } from "react-chartjs-2";
// import { useTheme } from "next-themes";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import useGetMountStatus from "@/hooks/useGetMountStatus";
import { BestProductSellers } from "../../_types/BestSellers";

export default function BestSellers({
  bestSellers,
}: {
  bestSellers: BestProductSellers;
}) {
  const mounted = useGetMountStatus();
  //   const { theme } = useTheme();
  const productNames = bestSellers.map((product) => product.name);
  const sales = bestSellers.map((product) => product.sales);
  return (
    <Card>
      <Typography variant="h3" className="mb-4">
        Best Selling Products
      </Typography>

      <CardContent className="pb-2">
        <div className="relative h-[18.625rem]">
          {mounted ? (
            <Pie
              data={{
                labels: productNames,
                datasets: [
                  {
                    label: "Orders",
                    data: sales,
                    backgroundColor: [
                      "rgb(34, 197, 94)",
                      "rgb(59, 130, 246)",
                      "rgb(249, 115, 22)",
                      "rgb(99, 102, 241)",
                    ],
                    borderColor: "rgb(255,255,255)",
                    //   theme === "light" ? "rgb(255,255,255)" : "rgb(23,23,23)",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
              }}
            />
          ) : (
            <Skeleton className="size-full" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
