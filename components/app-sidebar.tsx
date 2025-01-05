import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Hero",
      url: "#",
      items: [
        {
          title: "Carousel",
          url: "/dashboard/hero/carousel",
        },
        {
          title: "Edit Hero",
          url: "/dashboard/hero",
        },
      ],
    },
    {
      title: "Penjual",
      url: "#",
      items: [
        {
          title: "Daftar Penjual",
          url: "/dashboard/penjual",
        },
        {
          title: "Tambah Penjual",
          url: "/dashboard/tambah_penjual",
          isActive:true
        },
      ],
    },
    {
      title: "Kontak",
      url: "#",
      items: [
        {
          title: "Edit Kontak",
          url: "/dashboard/tambah_contacts",
        },
        {
          title: "Edit Service",
          url: "#",
        },
      ],
    },
    {
      title: "Tentang Kami",
      url: "#",
      items: [
        {
          title: "Edit Tentang Kami",
          url: "/dashboard/about-us",
        },
      ],
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-xl font-bold">Documentation</h1>
      </SidebarHeader>

      {/* Dynamic Sidebar Content */}
      <SidebarContent>
        {data.navMain.map((group, index) => (
          <Collapsible key={index} defaultOpen className="group">
            {/* Sidebar Group Title */}
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <span>{group.title}</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              {/* Sidebar Group Items */}
              <CollapsibleContent
                className="overflow-hidden transition-all duration-300 ease-in-out"
              >
                <SidebarMenuSub>
                  {group.items.map((item) => (
                    <SidebarMenuSubItem key={item.title} >
                      <SidebarMenuButton isActive={item.isActive}>
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}