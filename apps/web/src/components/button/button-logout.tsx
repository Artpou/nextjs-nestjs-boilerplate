'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { Button } from '@workspace/ui/components/button';

export default function LogoutButton({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const t = useTranslations('common');

  return (
    <Button
      variant="destructive"
      onClick={() =>
        signOut({
          callbackUrl: '/',
          redirect: true,
        })
      }
    >
      <LogOut className="size-4" />
      {!collapsed && <span className="truncate">{t('logout')}</span>}
    </Button>
  );
}
