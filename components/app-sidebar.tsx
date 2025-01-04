import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
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
import { ChevronDown } from "lucide-react";

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
          url: "#",
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
        },
        {
          title: "Edit Penjual",
          url: "#",
          isActive: true,
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
  ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item, index) => (
      <SidebarContent key={index}>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem key={index} className="list-none">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <a>{item.title}</a>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {/* <SidebarGroupContent> */}
                <SidebarMenuSub>
                  {item.items.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuButton isActive={item.isActive}>
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
                {/* </SidebarGroupContent> */}
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
      </SidebarContent>
        ))}
      <SidebarRail />
    </Sidebar>
  );
}
