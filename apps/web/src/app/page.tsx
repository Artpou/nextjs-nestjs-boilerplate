import Link from "next/link";

import LogoutButton from "../components/ButtonLogout";

import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log("🚀 ~ Home ~ session:", session?.user?.email);

  // const test = await POST("/tester/post", { body: { id: "" } });

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      {session?.user ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl">Welcome {session.user.name}!</h1>
          <p>Email: {session.user.email}</p>
          <LogoutButton />
        </div>
      ) : (
        <div className="flex gap-4">
          <Link className="btn btn-primary" href="/login">
            Login
          </Link>
          <Link className="btn" href="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </section>
  );
}
