import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardNav from "@/components/DashboardNav";
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex bg-white min-h-screen">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex-1 bg-white">
          {/* Navbar with proper spacing */}
          <DashboardNav />

          {/* Page Content with margin to prevent overlap */}
          <main className="p-6 mt-16 bg-white">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;
