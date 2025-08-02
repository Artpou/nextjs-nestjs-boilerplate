"use client";

import { UserPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@workspace/ui/components/button";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { Topbar } from "@workspace/ui/components/topbar";

import favicon from "@/app/favicon.ico";

export function AppTopbar() {
  const router = useRouter();

  return (
    <Topbar>
      <Image
        src={favicon}
        alt="favicon"
        className="size-0 cursor-pointer rounded-sm sm:size-8"
        onClick={() => router.push("/")}
      />
      <SidebarTrigger />

      <Button variant="secondary" size="icon">
        <UserPlus />
      </Button>
    </Topbar>
  );
}
