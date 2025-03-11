import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import React, { Suspense } from "react";
import ClientProvider from "../../store/provider";
import Header from "../../components/frontstore/header";
import CartSideBar from "@/components/frontstore/cartSideBar";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/frontstore/footer";
import TopBarV2 from "@/components/frontstore/topBar-v2";
// import MobileNavSlider from "@/components/frontstore/mobileNavSlider";

export const metadata: Metadata = {
  title: "Ramtec",
  description: "service informatique et bureautique",
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

          {/* <TopBar /> */}
          <TopBarV2 />
          <CartSideBar />
          <Toaster />
          {children}
          <Footer />
        </SessionProvider>
      </ClientProvider>
    </Suspense>
  );
}
