import { ShoppingCart, RefreshCcw, Check, Truck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { StatusSummary } from "../_types/StatusSummary";

export default function StatusOverview({
  statusSummary,
}: {
  statusSummary: StatusSummary;
}) {
  type DashboardCard = {
    icon: React.ReactNode;
    title: string;
    value: string;
    className: string;
  };

  const { processing, pending, delivered, total } = statusSummary;

  const cards: DashboardCard[] = [
    {
      icon: <ShoppingCart />,
      title: "Total Orders",
      value: `${total}`,
      className:
        "text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500",
    },
    {
      icon: <RefreshCcw />,
      title: "Orders Pending",
      value: `${pending}`,
      className:
        "text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500",
    },
    {
      icon: <Truck />,
      title: "Orders Processing",
      value: `${processing}`,
      className:
        "text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500",
    },
    {
      icon: <Check />,
      title: "Orders Delivered",
      value: `${delivered}`,
      className:
        "text-emerald-600 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="flex items-center gap-3 p-0">
            <div
              className={cn(
                "size-12 rounded-full grid place-items-center [&>svg]:size-5",
                card.className
              )}
            >
              {card.icon}
            </div>

            <div className="flex flex-col gap-y-1">
              <Typography className="text-sm text-muted-foreground">
                {card.title}
              </Typography>

              <Typography className="text-2xl font-semibold text-popover-foreground">
                {card.value}
              </Typography>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
