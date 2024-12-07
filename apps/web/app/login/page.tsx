"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { signInAction } from "../actions";

type FormInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const data = useRef<FormInputs>({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const result = await signInAction(
        data.current.email,
        data.current.password,
      );

      if (result?.error) {
        alert(result.error);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <input
        className="input input-bordered"
        placeholder="Email"
        onChange={(e) => (data.current.email = e.target.value)}
        required
      />
      <input
        className="input input-bordered"
        placeholder="Password"
        type="password"
        onChange={(e) => (data.current.password = e.target.value)}
        required
      />
      <div className="flex justify-center items-center gap-4">
        <button className="btn btn-primary" onClick={handleLogin}>
          Sign In
        </button>
        <Link className="btn" href={"/"}>
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
