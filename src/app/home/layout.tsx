import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/dashboard-layout/header";
import SideNav from "@/components/dashboard-layout/side-nav";
import PageWrapper from "@/components/dashboard-layout/page-wrapper";
import HeaderMobile from "@/components/dashboard-layout/header-mobile";
import MarginWidthWrapper from "@/components/dashboard-layout/margin-width-wrapper";

export const metadata: Metadata = {
  title: "LPMS",
  description: "Take your property management to the next level",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />

          <PageWrapper>{children}</PageWrapper>
          <Toaster />
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
