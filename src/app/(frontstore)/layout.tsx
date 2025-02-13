import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import React from "react";
import ClientProvider from "../../store/provider";
import Header from "../../components/frontstore/header";

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
        {/* <Sidebar /> */}
        <Toaster />
        {children}
      </ClientProvider>
    </div>
  );
}
