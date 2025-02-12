import {
  RefreshCcw, // Similar to HiOutlineRefresh
  Layers, // Similar to HiOutlineSquare3Stack3D
  CalendarDays, // Similar to HiCalendarDays
} from "lucide-react";

import { cn } from "@/lib/utils";

type DashboardCard = {
  icon: React.ReactNode;
  title: string;
  value: string;
  className: string;
};
import Typography from "@/components/ui/typography";
import { SalesSummary } from "../_types/SalesSummary";

export default function SalesOverview({
  salesSummary,
}: {
  salesSummary: SalesSummary;
}) {
  const { today, yesterday, thisMonth, lastMonth, allTime } = salesSummary;
  const cards: DashboardCard[] = [
    {
      icon: <Layers />,
      title: "Today Orders",
      value: `${today.totalAmount}`,
      className: "bg-teal-600",
    },
    {
      icon: <Layers />,
      title: "Yesterday Orders",
      value: `${yesterday.totalAmount}`,
      className: "bg-orange-400",
    },
    {
      icon: <RefreshCcw />,
      title: "This Month",
      value: `${thisMonth.totalAmount}`,
      className: "bg-blue-500",
    },
    {
      icon: <CalendarDays />,
      title: "Last Month",
      value: `${lastMonth.totalAmount}`,
      className: "bg-cyan-600",
    },
    {
      icon: <CalendarDays />,
      title: "All-Time Sales",
      value: `${allTime.totalAmount}`,
      className: "bg-emerald-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-2">
      {cards.map((card, index) => (
        <div
          key={`sales-overview-${index}`}
          className={cn(
            "p-6 rounded-lg flex flex-col items-center justify-center space-y-3 text-white text-center",
            card.className
          )}
        >
          <div className="[&>svg]:size-8">{card.icon}</div>

          <Typography className="text-base">{card.title}</Typography>

          <Typography className="text-2xl font-semibold">
            {card.value}
            <span className="text-sm px-1">TND</span>
          </Typography>
        </div>
      ))}
    </div>
  );
}
