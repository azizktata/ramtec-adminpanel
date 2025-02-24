import { Toaster } from "react-hot-toast";
import React, { Suspense } from "react";
import ClientProvider from "../../store/provider";
import Header from "../../components/frontstore/header";
import CartSideBar from "@/components/frontstore/cartSideBar";
import { SessionProvider } from "next-auth/react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback="loading...">
      <SessionProvider>
        <ClientProvider>
          <Header />

          <CartSideBar />
          <Toaster />
          {children}
        </ClientProvider>
      </SessionProvider>
    </Suspense>
  );
}
