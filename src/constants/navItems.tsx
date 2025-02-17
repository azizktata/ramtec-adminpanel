import {
  LayoutDashboard,
  ShoppingCart,
  Tags,
  Users,
  Truck,
  Briefcase,
  Settings,
} from "lucide-react";

export const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Products",
    url: "/products",
    icon: <ShoppingCart />,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: <Tags />,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: <Users />,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: <Truck />,
  },
  // {
  //   title: "Coupons",
  //   url: "/coupons",
  //   icon: <Ticket />,
  // },
  {
    title: "Sellers",
    url: "/sellers",
    icon: <Briefcase />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
  },
];
