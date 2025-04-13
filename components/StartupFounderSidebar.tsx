"use client";

import { usePathname } from "next/navigation";
import { LayoutGrid, Briefcase, Eye } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
const menuItems = [
  { title: "Dashboard", url: "/startup_founder_dashboard", icon: LayoutGrid },
  { title: "Job Posts", url: "/startup_founder_dashboard/PostJob", icon: Briefcase },
 { title: "Applications", url: "/startup_founder_dashboard/Application", icon: Eye },
  // { title: "Application Tracking", url: "/dashboard/Application_Tracking", icon: Eye },
];

export function StartupFounderSidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname(); // Get the current route
const router = useRouter();
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
      "fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm p-4 transition-transform duration-300 lg:translate-x-0 z-[90]",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* Logo */}
      {/* <div className="px-4 pb-6 flex items-center gap-2 border-b-2">
        <img src="/assets/images/logo.png" alt="Launch Connect" className="h-6" />
        <span className="text-lg font-bold text-gray-900">Launch Connect</span>
      </div> */}

  <div
        onClick={() => router.push("/")}
        className="flex items-center gap-2 cursor-pointer z-50 border-b-2 pb-4"
      >
        <Image
          src="/assets/images/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className=""
        />
        <div className="flex flex-col text-[17px] customGreen cal_sans font-bold text-[#5D7061]">
          <h2 className="">Launch</h2>
          <span className="custom-mt-2">Connect</span>
        </div>
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
