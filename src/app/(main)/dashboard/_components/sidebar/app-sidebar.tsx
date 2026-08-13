"use client";

import { useMemo } from "react";

import Image from "next/image";
import Link from "next/link";

import { CircleHelp, ClipboardList, Command, Database, File, Search, Settings } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config/app-config";
import { getRoleRedirectPath } from "@/lib/utils";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { useAuthStore } from "@/stores/auth/use-auth-store";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { SidebarSupportCard } from "./sidebar-support-card";

const _data = {
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: CircleHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: Database,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardList,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: File,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { sidebarVariant, sidebarCollapsible, isSynced } = usePreferencesStore(
    useShallow((s) => ({
      sidebarVariant: s.values.sidebar_variant,
      sidebarCollapsible: s.values.sidebar_collapsible,
      isSynced: s.isSynced,
    })),
  );

  const authUser = useAuthStore((state) => state.user);
  const logoHref = getRoleRedirectPath(authUser);

  const sidebarUser = {
    name: authUser?.full_name || "Unknown",
    email: authUser?.email || "",
    avatar: "",
  };

  const filteredSidebarItems = useMemo(() => {
    return sidebarItems
      .map((group) => {
        // Filter out group if user doesn't have required role
        if (group.roles && authUser && !group.roles.includes(authUser.role)) {
          return null;
        }

        // Filter items within the group
        const filteredItems = group.items.filter((item) => {
          if (item.roles && authUser && !item.roles.includes(authUser.role)) {
            return false;
          }
          return true;
        });

        return { ...group, items: filteredItems };
      })
      .filter((group) => group !== null && group.items.length > 0) as typeof sidebarItems;
  }, [authUser]);

  const variant = isSynced ? sidebarVariant : props.variant;
  const collapsible = isSynced ? sidebarCollapsible : props.collapsible;

  return (
    <Sidebar {...props} variant={variant} collapsible={collapsible}>
      <SidebarHeader className="h-16 flex items-center border-b border-sidebar-border px-4 py-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
        <Link
          prefetch={false}
          href={logoHref}
          className="flex h-full items-center gap-2 group-data-[collapsible=icon]:justify-center"
        >
         
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-base font-extrabold leading-tight tracking-tight text-sidebar-foreground">
              Second Opinion
            </span>
            <span className="text-[10px] font-bold text-[#e00b41] tracking-wide">
              by qik plus
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredSidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
