import { LayoutGrid, Briefcase, Eye } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutGrid },
  { title: "Find Jobs", url: "dashboard/findjobs", icon: Briefcase },
  { title: "Application Tracking", url: "#", icon: Eye },
];

export function AppSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 min-w-64 bg-white border-r shadow-sm p-4">
      {/* Logo */}
      <div className="px-4 pb-6 flex items-center gap-2">
        <img src="/assets/images/logo.png" alt="Launch Connect" className="h-6" />
        <span className="text-lg font-bold text-gray-900">Launch Connect</span>
      </div>

      {/* Menu */}
      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition ${
              item.title === "Dashboard" ? "bg-green-100 text-green-700 font-semibold" : ""
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
