"use client";

import { usePathname } from "next/navigation";
import { LayoutGrid, Briefcase, Eye } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutGrid },
  { title: "Find Jobs", url: "/dashboard/findjobs", icon: Briefcase },
 { title: "Application Tracking", url: "/dashboard/Application_Tracking", icon: Eye },
  // { title: "Application Tracking", url: "/dashboard/Application_Tracking", icon: Eye },
];

export function AppSidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname(); // Get the current route

  return (
    <>

    {/* Background Overlay */}
<div
  className={cn(
    "fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300",
    isOpen ? "opacity-40 z-[90]" : "opacity-0 pointer-events-none"
  )}
/>

    <aside   className={cn(
      "fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm p-4 transition-transform duration-300 lg:translate-x-0 z-[100]",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* Logo */}
      <div className="px-4 pb-6 flex items-center gap-2 border-b-2">
        <img src="/assets/images/logo.png" alt="Launch Connect" className="h-6" />
        <span className="text-lg font-bold text-gray-900">Launch Connect</span>
      </div>

      {/* Menu */}
      <nav className="space-y-1">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.url; // Check if the current route matches the menu item URL

          return (
            <Link
              key={index}
              href={item.url}
              className={`flex items-center gap-3 p-3 rounded-lg mt-7 transition ${
                isActive
                  ? "bg-green-100 text-primary font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
    </>
  );
}
