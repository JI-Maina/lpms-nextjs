import type { Metadata } from "next";

import Header from "@/components/dashboard-layout/header";
import HeaderMobile from "@/components/dashboard-layout/header-mobile";
import SideNav from "@/components/dashboard-layout/side-nav";
import MarginWidthWrapper from "@/components/dashboard-layout/margin-width-wrapper";
import PageWrapper from "@/components/dashboard-layout/page-wrapper";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex">
        <SideNav />
        <main className="flex-1">
          <MarginWidthWrapper>
            <Header />
            <HeaderMobile />

            <PageWrapper>{children}</PageWrapper>
          </MarginWidthWrapper>
        </main>
      </div>
    </ThemeProvider>
  );
}
