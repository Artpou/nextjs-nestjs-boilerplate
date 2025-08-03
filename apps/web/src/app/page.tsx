import Link from 'next/link';

import { getTranslations } from 'next-intl/server';

import { Button } from '@workspace/ui/components/button';

import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  const t = await getTranslations('common');

  if (!session) {
    return (
      <section className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-4">
          <Button variant="secondary" asChild>
            <Link href="/login">{t('login')}</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">{t('signup')}</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div className="flex size-full gap-4 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Site name</h1>
        <p className="text-muted-foreground">
          This is a test page. You can view company information below.
        </p>
        <Button asChild>
          <Link href="/company/eab6cd4f-d7bf-44d9-b707-d0437724d149">
            View Company
          </Link>
        </Button>
      </div>
    </div>
  );
}
