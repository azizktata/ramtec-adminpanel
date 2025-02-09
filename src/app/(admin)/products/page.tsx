import Typography from "@/components/ui/typography";
import React from "react";
import ProductFilters from "./_components/ProductFilters";
import ProductActions from "./_components/ProductActions";
import AllProducts from "./_components/products-table";

export default function Products() {
  return (
    <>
      <section>
        <Typography variant="h1" className="mb-6">
          Products
        </Typography>

        <div className="space-y-8 mb-8">
          <ProductActions />
          <ProductFilters />
          <AllProducts />
          {/*
           */}

          {/* <DashboardCharts /> */}
        </div>
      </section>
    </>
  );
}
