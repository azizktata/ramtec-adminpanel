import { getThisMonthOrders } from "@/actions/orders";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { format } from "date-fns";

export async function RecentSales() {
  const thisMonthOrders = (await getThisMonthOrders()).toReversed();
  const last5Orders = thisMonthOrders.slice(0, 5);
  const numberOfOrders = thisMonthOrders.length;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>
          You made {numberOfOrders} sales this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {last5Orders.map((order) => (
            <div key={order.id} className="flex items-start">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://api.slingacademy.com/public/sample-users/1.png"
                  alt="Avatar"
                />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {order.customer.name}
                </p>
                <p className="text-sm text-mutedForeground">
                  {order.customer.email}
                </p>
                <p className="text-mutedForeground font-light text-xs ">
                  {format(order.orderTime, "MMM dd, yyyy")}
                </p>
              </div>
              <div className="ml-auto  ">
                <p className="text-green-500 font-medium">
                  +{order.amount} <span className="text-xs">TND</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
