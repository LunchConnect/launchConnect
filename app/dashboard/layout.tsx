"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardNav from "@/components/DashboardNav";
import { ModeToggle } from "@/components/mode-toogle";
import { cn } from "@/lib/utils";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { useEffect, useState } from "react";
const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
   {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"></div>}
{/* Sidebar */}
<AppSidebar isOpen={sidebarOpen} />

 
      
      {/* Top Navbar */}
      <DashboardNav onMenuClick={() => setSidebarOpen(true)} />




            <main className="flex flex-1 flex-col gap-4 p-2 pt-0 w-full h-full lg:ml-64 md:ml-0 bg-gray-200">
           
            
    
           
              {children}
            </main>
          </SidebarProvider>
      
 
    
  );
}

export default DashboardLayout;
