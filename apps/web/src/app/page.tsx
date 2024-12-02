"use client";

import { useClerk } from "@clerk/nextjs";

export default function Home() {
  const { client, user } = useClerk();

  console.log({ user, client });

  return <div>test</div>;
}
