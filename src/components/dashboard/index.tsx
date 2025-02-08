import RecentOrders from "../orders/orders-table";
import Typography from "../ui/typography";
import DashboardCharts from "./charts";
import SalesOverview from "./Sales";
import StatusOverview from "./Status";

export default function Dashboard() {
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

        <RecentOrders />
      </section>
    </>
  );
}
