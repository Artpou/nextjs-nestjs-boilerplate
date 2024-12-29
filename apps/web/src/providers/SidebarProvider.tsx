"use client";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { useSession } from "next-auth/react";

import { AppSidebar } from "@/components/AppSidebar";
import { AppTopbar } from "@/components/AppTopbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "unauthenticated") return children;

  return (
    <SidebarProvider defaultOpen={false}>
      <AppTopbar />

      <AppSidebar />
      <main className="mx-auto grow pt-14">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
