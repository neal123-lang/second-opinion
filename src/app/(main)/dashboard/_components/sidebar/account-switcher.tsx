"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { BadgeCheck, Bell, Check, CreditCard, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth/use-auth-store";

export function AccountSwitcher() {
  const authUser = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  if (!authUser) {
    return null;
  }

  const activeUser = {
    id: authUser.id,
    name: authUser.full_name || "Unknown",
    email: authUser.email || "",
    role: authUser.role || "User",
    avatar: "",
  };

  const handleLogout = () => {
    logout();
    router.push("/auth/v2/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 rounded-full border border-border cursor-pointer">
          <AvatarImage src={activeUser.avatar || undefined} alt={activeUser.name} />
          <AvatarFallback className="rounded-full bg-primary/10 text-primary text-xs font-bold">{getInitials(activeUser.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 space-y-1 rounded-[14px]" side="bottom" align="end" sideOffset={4}>
        <DropdownMenuItem key={activeUser.email} className="p-0 bg-accent/50" aria-current="true">
          <div className="flex w-full items-center gap-2 px-1 py-1.5">
            <Avatar className="size-9 rounded-full">
              <AvatarImage src={activeUser.avatar || undefined} alt={activeUser.name} />
              <AvatarFallback className="rounded-full bg-primary/10 text-primary text-xs font-bold">{getInitials(activeUser.name)}</AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{activeUser.name}</span>
              <span className="truncate text-xs capitalize">{activeUser.role}</span>
            </div>
            <span className="mr-1 flex size-5 items-center justify-center rounded-full text-primary opacity-100">
              <Check aria-hidden="true" />
            </span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
