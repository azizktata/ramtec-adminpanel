import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import React from "react";
import ClientProvider from "../../store/provider";
import Header from "../../components/frontstore/header";
import CartSideBar from "@/components/frontstore/cartSideBar";

export const metadata: Metadata = {
  title: "Ramtec",
  description: "ecommerce",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {" "}
      <ClientProvider>
        <Header />
        <CartSideBar />
        <Toaster />
        {children}
      </ClientProvider>
    </div>
  );
}
