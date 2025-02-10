import Typography from "@/components/ui/typography";
import React from "react";
import ShowCustomersTable from "./customer-table";
import prisma from "@/lib/db";
import CustomerActions from "./CustomerActions";

export default async function Customers() {
  const customers = await prisma.customer.findMany();
  return (
    <>
      <section>
        <Typography variant="h1" className="mb-6">
          Customers
        </Typography>

        <div className="space-y-8 mb-8">
          <CustomerActions />
          <ShowCustomersTable customers={customers} />
          {/*
           */}

          {/* <DashboardCharts /> */}
        </div>
      </section>
    </>
  );
}
