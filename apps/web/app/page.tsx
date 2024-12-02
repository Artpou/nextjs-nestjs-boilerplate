import { auth } from "@/auth";
import Link from "next/link";
import LogoutButton from "./components/ButtonLogout";

export default async function Home() {
  const session = await auth();

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
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
          <Link href="/signup" className="btn">
            Sign Up
          </Link>
        </div>
      )}
    </section>
  );
}
