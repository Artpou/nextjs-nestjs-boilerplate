"use client";
import { auth } from "@/auth";
import Link from "next/link";
import React, { useRef } from "react";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const register = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/register",
      {
        method: "POST",
        body: JSON.stringify({
          name: data.current.name,
          email: data.current.email,
          password: data.current.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    alert("User Registered!");
    console.log({ response });
  };

  const data = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="flex flex-col gap-6">
      <input
        className="input input-bordered"
        placeholder="Name"
        onChange={(e) => (data.current.name = e.target.value)}
        required
      />
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
        <button className="btn btn-primary" onClick={register}>
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
