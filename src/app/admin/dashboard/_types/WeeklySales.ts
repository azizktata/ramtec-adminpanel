
 type DailySalesData = {
    date: string; // e.g., "Feb 12"
    totalRevenue: number;
    totalOrders: number;
  };
  
  export type WeeklySalesData = DailySalesData[];
  