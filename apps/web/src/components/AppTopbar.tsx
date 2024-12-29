"use client";

import { Topbar } from "@workspace/ui/components/topbar";
import { UserPlus } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

import { SearchArtist } from "./SearchArtist";

export function AppTopbar() {
  return (
    <Topbar>
      <SearchArtist />
      <Button variant="secondary" size="icon">
        <UserPlus />
      </Button>
    </Topbar>
  );
}
