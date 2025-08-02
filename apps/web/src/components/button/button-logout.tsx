"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

import { Button } from "@workspace/ui/components/button";

export default function LogoutButton({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const t = useTranslations("common");

  const handleSignOut = () => {
    console.log("Starting signout...");

    // Use NextAuth's default signOut method
    signOut({
      callbackUrl: "/",
      redirect: true,
    }).catch((error) => {
      console.error("Signout error:", error);
    });
  };

  return (
    <Button variant="destructive" onClick={handleSignOut}>
      <LogOut className="size-4" />
      {!collapsed && <span className="truncate">{t("logout")}</span>}
    </Button>
  );
}
