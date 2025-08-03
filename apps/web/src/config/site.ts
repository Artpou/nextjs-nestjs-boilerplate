import { Home, UserRound } from 'lucide-react';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Site name',
  description: '',
  navItems: [
    {
      label: 'home',
      href: '/',
      icon: Home,
    },
    {
      label: 'profile',
      href: '/me',
      icon: UserRound,
    },
  ],
};
