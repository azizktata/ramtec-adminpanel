"use client";

import { Line } from "react-chartjs-2";
// import { useTheme } from "next-themes";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import { getPastDates } from "@/utils/getPastDates";
import useGetMountStatus from "@/hooks/useGetMountStatus";
import { WeeklySalesData } from "../../_types/WeeklySales";

export default function WeeklySales({
  last7DaysSales,
}: {
  last7DaysSales: WeeklySalesData;
}) {
  // const labels = getPastDates(7);
  //   const { theme } = useTheme();
  const mounted = useGetMountStatus();
  console.log("last7DaysSales", last7DaysSales);
  const gridColor = `rgba(161, 161, 170, 0.5)`;
  //   const gridColor = `rgba(161, 161, 170, ${theme === "light" ? "0.5" : "0.3"})`;

  const revenuData = last7DaysSales.map((data) => data.totalRevenue);
  const orderData = last7DaysSales.map((data) => data.totalOrders);
  const labels = last7DaysSales.map((data) => data.date);
  return (
    <Card>
      <Typography variant="h3" className="mb-4">
        Weekly Sales
      </Typography>

      <CardContent className="pb-2">
        <Tabs defaultValue="sales">
          <TabsList className="mb-6">
            <TabsTrigger
              value="sales"
              className="data-[state=active]:text-primary"
            >
              Sales
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:text-orange-500"
            >
              Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="relative h-60">
            {mounted ? (
              <Line
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Sales",
                      data: revenuData,
                      borderColor: "rgb(34, 197, 94)",
                      backgroundColor: "rgb(34, 197, 94)",
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      grid: {
                        color: gridColor,
                      },
                      border: {
                        color: gridColor,
                      },
                      ticks: {
                        stepSize: 200,
                        callback: function (value) {
                          return "$" + value;
                        },
                        padding: 4,
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) =>
                          `${context.dataset.label}: $${context.parsed.y}`,
                      },
                    },
                  },
                }}
              />
            ) : (
              <Skeleton className="size-full" />
            )}
          </TabsContent>

          <TabsContent value="orders" className="relative h-60">
            {mounted ? (
              <Line
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Orders",
                      data: orderData,
                      borderColor: "rgb(249, 115, 22)",
                      backgroundColor: "rgb(249, 115, 22)",
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      grid: {
                        color: gridColor,
                      },
                      border: {
                        color: gridColor,
                      },
                      ticks: {
                        stepSize: 1,
                        padding: 4,
                      },
                      min: 0,
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            ) : (
              <Skeleton className="size-full" />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
