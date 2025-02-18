import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";
import Container from "@/components/ui/container";
import { AppContextProvider } from "@/context/App";
import { auth } from "@/lib/auth";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/sign-in");

  return (
    <AppContextProvider>
      <TooltipProvider>
        <div className="flex h-dvh overflow-hidden">
          <Sidebar />

          <div className="w-full relative overflow-y-auto">
            <Header />

            <main className="pt-6 pb-8 bg-[#F9FAFB] min-h-screen">
              <Container>{children}</Container>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </AppContextProvider>
  );
}
