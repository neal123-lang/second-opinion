"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";

import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { useAuthStore } from "@/stores/auth/use-auth-store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setHasHydrated(true);
    } else {
      const unsub = useAuthStore.persist.onFinishHydration(() => setHasHydrated(true));
      return () => unsub();
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!token || !user) {
      // Determine which login to redirect to based on the current path if possible,
      // otherwise default to the admin login.
      if (pathname.includes("/patient")) {
        router.replace("/auth/patient/login");
      } else {
        router.replace("/auth/v2/login");
      }
      return;
    }

    // Flatten all items from sidebar to find the matching route
    const allItems = sidebarItems.flatMap((group) =>
      group.items.flatMap((item) => {
        if (item.subItems) {
          return item.subItems.map((sub) => ({ url: sub.url, roles: sub.roles || item.roles }));
        }
        return [{ url: item.url, roles: item.roles }];
      }),
    );

    // Find if the current pathname matches any defined item
    const matchingItem = allItems.find((item) => item.url && pathname.startsWith(item.url));

    // If a matching item is found, check if it has role restrictions
    if (matchingItem && matchingItem.roles) {
      if (!matchingItem.roles.includes(user.role)) {
        // User doesn't have the required role for this route
        console.warn(`Access denied to ${pathname} for role ${user.role}`);
        router.replace("/dashboard");
      }
    }
  }, [hasHydrated, token, user, pathname, router]);

  if (!hasHydrated || !token || !user) {
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
