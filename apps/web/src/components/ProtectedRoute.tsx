"use client";

import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated() && pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname]);

  return <>{children}</>;
}
