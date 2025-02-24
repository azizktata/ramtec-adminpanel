import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import React, { Suspense } from "react";
import ClientProvider from "../../store/provider";
import Header from "../../components/frontstore/header";
import CartSideBar from "@/components/frontstore/cartSideBar";
import TopBar from "@/components/frontstore/topBar";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/frontstore/footer";
// import MobileNavSlider from "@/components/frontstore/mobileNavSlider";

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
    <Suspense>
      <ClientProvider>
        <SessionProvider>
          <Header />

          <TopBar />
          <CartSideBar />
          <Toaster />
          {children}
          <Footer />
        </SessionProvider>
      </ClientProvider>
    </Suspense>
  );
}
