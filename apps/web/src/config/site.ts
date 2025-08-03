import { Home, UserRound } from 'lucide-react';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'SITE_NAME',
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
