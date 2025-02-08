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

export default function SalesOverview() {
  const cards: DashboardCard[] = [
    {
      icon: <Layers />,
      title: "Today Orders",
      value: "$897.40",
      className: "bg-teal-600",
    },
    {
      icon: <Layers />,
      title: "Yesterday Orders",
      value: "$679.93",
      className: "bg-orange-400",
    },
    {
      icon: <RefreshCcw />,
      title: "This Month",
      value: "$13146.96",
      className: "bg-blue-500",
    },
    {
      icon: <CalendarDays />,
      title: "Last Month",
      value: "$31964.92",
      className: "bg-cyan-600",
    },
    {
      icon: <CalendarDays />,
      title: "All-Time Sales",
      value: "$626513.05",
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
          </Typography>
        </div>
      ))}
    </div>
  );
}
