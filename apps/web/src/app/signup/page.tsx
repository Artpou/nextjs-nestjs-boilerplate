"use client";

import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";

import { signInAction } from "../../actions";

import { POST } from "@/fetcher";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const router = useRouter();
  const form = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const { error } = await POST("/auth/register", {
      body: {
        name: form.current.name,
        email: form.current.email,
        password: form.current.password,
      },
    });

    if (error) {
      alert(JSON.stringify(error));
      return;
    }

    const result = await signInAction(
      form.current.email,
      form.current.password,
    );

    if (result?.error) {
      alert(result.error);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      <input
        className="input input-bordered"
        placeholder="Name"
        onChange={(e) => (form.current.name = e.target.value)}
        required
      />
      <input
        className="input input-bordered"
        placeholder="Email"
        onChange={(e) => (form.current.email = e.target.value)}
        required
      />
      <input
        className="input input-bordered"
        placeholder="Password"
        type="password"
        onChange={(e) => (form.current.password = e.target.value)}
        required
      />
      <div className="flex items-center justify-center gap-4">
        <button className="btn btn-primary" onClick={handleRegister}>
          Submit
        </button>
        <Link className="btn" href={"/"}>
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
