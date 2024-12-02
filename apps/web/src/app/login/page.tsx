"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const success = await login(
        formData.get("email") as string,
        formData.get("password") as string
      );

      if (success) {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        name="email"
        type="email"
        placeholder="test@test.com"
        className="block w-full p-2 border rounded"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="password123"
        className="block w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
    </form>
  );
}
