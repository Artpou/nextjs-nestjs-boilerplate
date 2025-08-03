'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import LogoutButton from '../button/button-logout';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@workspace/ui/components/sidebar';

import { siteConfig } from '@/config/site';

export function AppSidebar() {
  const pathname = usePathname();
  const { data } = useSession();
  const { open } = useSidebar();
  const t = useTranslations('sidebar');

  const items = siteConfig.navItems.map((item) => ({
    ...item,
    // biome-ignore lint/suspicious/noExplicitAny: need any type
    title: t(item.label as any),
  }));

  if (!data) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
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
        <LogoutButton collapsed={!open} />
      </SidebarFooter>
    </Sidebar>
  );
}
