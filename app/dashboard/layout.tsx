import { AppSidebar } from "@/components/app-sidebar";
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "lucide-react";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
        </SidebarInset>
        </SidebarProvider>
    );
  }