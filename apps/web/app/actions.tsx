"use server";

import { signIn } from "@/auth";

export async function signInAction(email: string, password: string) {
  return await signIn("credentials", { email, password, redirect: false });
}
