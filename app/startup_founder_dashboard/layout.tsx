"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { StartupFounderSidebar } from "@/components/StartupFounderSidebar";
import StartDashboardNav from "@/components/StartDashboardNav";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { useEffect, useState } from "react";
function StartupDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Close sidebar when clicking outside
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarOpen &&
        !document.getElementById("sidebar")?.contains(event.target as Node) &&
        !document.getElementById("menu-button")?.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);
  return (
    <SidebarProvider>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"></div>
      )}

      {/* Sidebar */}
      <StartupFounderSidebar isOpen={sidebarOpen} />

      {/* Top Navbar */}
      <StartDashboardNav onMenuClick={() => setSidebarOpen(true)} />

      <main className="flex flex-1 flex-col gap-4 p-2 pt-0 w-full lg:ml-64 md:ml-0 bg-[#FAFAFA]">
        {children}
      </main>
    </SidebarProvider>
  );
}

export default StartupDashboardLayout;
