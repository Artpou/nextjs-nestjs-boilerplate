import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { BackgroundBeams } from "@workspace/ui/components/background-beams";

import { auth } from "@/auth";
import { GET } from "@/app/api/client";

export default async function Profile() {
  const session = await auth();
  const t = await getTranslations("common");
  await GET("/auth/me");

  if (!session?.user) {
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
    <section className="flex flex-col items-center justify-center gap-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            Welcome {session.user.name}!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p>Email: {session.user.email}</p>
        </CardContent>
      </Card>
    </section>
  );
}
