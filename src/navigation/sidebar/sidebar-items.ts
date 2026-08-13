import { Banknote, Building2, ClipboardList, Fingerprint, Gauge, type LucideIcon, SquareArrowUpRight } from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
  roles?: string[];
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
  roles?: string[];
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
  roles?: string[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 2,
    label: "Hospital Management",
    items: [
      {
        id: "hospitals",
        title: "Hospitals",
        url: "/dashboard/hospitals",
        icon: Building2,
        roles: ["SUPER_ADMIN"],
      },
      {
        id: "doctors",
        title: "Doctors",
        url: "/dashboard/doctors",
        icon: Building2, // Reusing icon for now, could be Users or Stethoscope if imported
        roles: ["HOSPITAL_ADMIN"],
      },
      {
        id: "second-opinion-requests",
        title: "Second Opinion Requests",
        url: "/dashboard/second-opinion-requests",
        icon: ClipboardList,
        roles: ["HOSPITAL_ADMIN"],
      },
    ],
  },
];
