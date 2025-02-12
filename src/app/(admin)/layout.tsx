import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";
import Container from "@/components/ui/container";
import { AppContextProvider } from "@/context/App";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContextProvider>
      <TooltipProvider>
        <div className="flex h-dvh overflow-hidden">
          <Sidebar />

          <div className="w-full relative overflow-y-auto">
            <Header />

            <main className="pt-6 pb-8 bg-[#F9FAFB] ">
              <Container>{children}</Container>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </AppContextProvider>
  );
}
