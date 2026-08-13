"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import type { NavMainItem } from "@/navigation/sidebar/sidebar-items";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { useAuthStore } from "@/stores/auth/use-auth-store";

type SearchItem = {
  id: string;
  group: string;
  label: string;
  url: string;
  icon?: NavMainItem["icon"];
  disabled?: boolean;
  newTab?: boolean;
  roles?: string[];
};

const sidebarGroupLabels = new Set(sidebarItems.flatMap((group) => (group.label ? [group.label] : [])));

function getSubItemGroup(groupLabel: string | undefined, itemTitle: string) {
  return sidebarGroupLabels.has(itemTitle) ? (groupLabel ?? "Other") : itemTitle;
}

const allSearchItems: SearchItem[] = sidebarItems.flatMap((group) =>
  group.items.flatMap((item) => {
    if (item.subItems) {
      return item.subItems.map((sub) => ({
        id: sub.id,
        group: getSubItemGroup(group.label, item.title),
        label: sub.title,
        url: sub.url,
        icon: item.icon,
        disabled: sub.disabled,
        newTab: sub.newTab,
        roles: sub.roles || item.roles,
      }));
    }
    return [
      {
        id: item.id,
        group: group.label ?? "Other",
        label: item.title,
        url: item.url,
        icon: item.icon,
        disabled: item.disabled,
        newTab: item.newTab,
        roles: item.roles,
      },
    ];
  }),
);

function getAvailableItems(items: SearchItem[]) {
  return items.filter((item) => !item.disabled && !item.url.includes("coming-soon"));
}

function groupBy(items: SearchItem[]) {
  const groups = [...new Set(items.map((item) => item.group))];
  return groups.map((group) => ({
    group,
    items: items.filter((item) => item.group === group),
  }));
}

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();
  const authUser = useAuthStore((state) => state.user);

  const filteredSearchItems = React.useMemo(() => {
    return allSearchItems.filter((item) => {
      if (item.roles && authUser && !item.roles.includes(authUser.role)) {
        return false;
      }
      return true;
    });
  }, [authUser]);

  const recommendations = React.useMemo(() => {
    return getAvailableItems(filteredSearchItems);
  }, [filteredSearchItems]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) setQuery("");
  };

  const handleSelect = (item: SearchItem) => {
    if (item.disabled) return;
    handleOpenChange(false);
    if (item.newTab) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.url);
    }
  };

  const renderGroups = (items: SearchItem[]) =>
    groupBy(items).map(({ group, items: groupItems }, index) => (
      <React.Fragment key={group}>
        {index > 0 && <CommandSeparator />}
        <CommandGroup heading={group}>
          {groupItems.map((item) => (
            <CommandItem
              disabled={item.disabled}
              key={`${group}-${item.id}`}
              value={`${item.group} ${item.label}`}
              onSelect={() => handleSelect(item)}
            >
              <span className="flex min-w-0 items-center gap-2">
                {item.icon && <item.icon />}
                <span className="truncate">{item.label}</span>
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </React.Fragment>
    ));

  return (
    <>
      <button
        type="button"
        onClick={() => handleOpenChange(true)}
        className="flex w-64 sm:w-80 md:w-[380px] items-center justify-between gap-3 rounded-full border border-border bg-card py-1.5 pl-4 pr-1.5 text-xs font-medium text-card-foreground shadow-xs transition hover:bg-muted/80"
      >
        <div className="flex items-center gap-2 text-muted-foreground overflow-hidden">
          <Search className="size-4 text-primary shrink-0" />
          <span className="truncate text-xs font-medium text-muted-foreground">Search hospitals, doctors, opinions...</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-semibold text-muted-foreground">
            ⌘K
          </kbd>
          <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs">
            <Search className="size-3.5" />
          </div>
        </div>
      </button>
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <Command>
          <CommandInput placeholder="Search dashboards, users, and more…" value={query} onValueChange={setQuery} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {query ? renderGroups(filteredSearchItems) : renderGroups(recommendations)}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
