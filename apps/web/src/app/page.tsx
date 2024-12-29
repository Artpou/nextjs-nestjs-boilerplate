import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { getTranslations } from "next-intl/server";
import { BackgroundBeams } from "@workspace/ui/components/background-beams";

import { auth } from "@/auth";
import { GET } from "@/app/api/client";

export default async function Home() {
  const session = await auth();
  const t = await getTranslations("common");
  await GET("/auth/me");

  if (!session) {
    return (
      <section className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-4">
          <BackgroundBeams />
          <Button variant="secondary" asChild>
            <Link href="/login">{t("login")}</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">{t("signup")}</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4"></section>
  );
}
