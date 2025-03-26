import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardNav from "@/components/DashboardNav";
import { ModeToggle } from "@/components/mode-toogle";
import { cn } from "@/lib/utils";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
   
      <div  className={cn( "min-h-screen font-sans antialiased",
       fontSans.variable )} >
   
 <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full h-screen">
           
            
              <DashboardNav/>
           
              {children}
            </main>
          </SidebarProvider>
      
      </div>
    
  );
}

export default DashboardLayout;
