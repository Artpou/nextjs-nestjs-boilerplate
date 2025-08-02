import Link from 'next/link';

import { getTranslations } from 'next-intl/server';

import { Button } from '@workspace/ui/components/button';

import { auth } from '@/auth';
import { getAPI } from '@/lib/api';

// interface HomeProps {
//   searchParams: {
//     feed?: string;
//     sidebar?: string;
//   };
// }

export default async function Home() {
  const session = await auth();
  const t = await getTranslations('common');

  const { GET } = getAPI();
  const { data } = await GET('/auth/me');
  // biome-ignore lint/suspicious/noConsole: log
  console.log('🚀 ~ Home ~ data:', data);

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
          <Link href="/company/1">View Company (ID: 1)</Link>
        </Button>
      </div>
    </div>
  );
}
