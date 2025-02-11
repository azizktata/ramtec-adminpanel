import Typography from "@/components/ui/typography";
import { Metadata } from "next";
import SalesOverview from "./_components/SalesOverview";
import StatusOverview from "./_components/StatusOverview";
import DashboardCharts from "./_components/charts";
import RecentOrders from "@/app/(admin)/dashboard/_components/orders-table";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <>
      <section>
        <Typography variant="h1" className="mb-6">
          Dashboard Overview
        </Typography>

        <div className="space-y-8 mb-8">
          <SalesOverview />
          <StatusOverview />

          <DashboardCharts />
        </div>
      </section>

      <section>
        <Typography variant="h2" className="mb-6">
          Recent Orders
        </Typography>

        {/* <RecentOrders /> */}
      </section>
    </>
  );
}
