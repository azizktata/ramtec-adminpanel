import {
  LayoutDashboard,
  ShoppingCart,
  Tags,
  Users,
  Truck,
  Briefcase,
} from "lucide-react";

export const navItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: <ShoppingCart />,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: <Tags />,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: <Users />,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: <Truck />,
  },
  // {
  //   title: "Coupons",
  //   url: "/coupons",
  //   icon: <Ticket />,
  // },
  // {
  //   title: "Sellers",
  //   url: "/admin/sellers",
  //   icon: <Briefcase />,
  // },
  // {
  //   title: "Settings",
  //   url: "/settings",
  //   icon: <Settings />,
  // },
];
