"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { Home, Search, Settings, TrendingUp, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import ButtonLogout from "./ButtonLogout";

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const t = useTranslations("sidebar");

  const items = [
    {
      title: t("home"),
      url: "/",
      icon: Home,
    },
    {
      title: t("trending"),
      url: "/trending",
      icon: TrendingUp,
    },
    {
      title: t("search"),
      url: "/search",
      icon: Search,
    },
    {
      title: t("profile"),
      url: "/profile",
      icon: User,
    },
    {
      title: t("settings"),
      url: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ButtonLogout collapsed={!open} />
      </SidebarFooter>
    </Sidebar>
  );
}
