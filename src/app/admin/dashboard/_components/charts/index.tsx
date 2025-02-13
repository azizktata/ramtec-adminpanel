"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import WeeklySales from "./WeeklySales";
import BestSellers from "./BestSellers";
import { WeeklySalesData } from "../../_types/WeeklySales";
import { BestProductSellers } from "../../_types/BestSellers";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip
);

export default function DashboardCharts({
  last7DaysSales,
  bestSellers,
}: {
  last7DaysSales: WeeklySalesData;
  bestSellers: BestProductSellers;
}) {
  ChartJS.defaults.font.family = "'Poppins', sans-serif";
  ChartJS.defaults.font.size = 12;
  ChartJS.defaults.font.weight = "normal";
  ChartJS.defaults.responsive = true;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <WeeklySales last7DaysSales={last7DaysSales} />
      <BestSellers bestSellers={bestSellers} />
    </div>
  );
}
