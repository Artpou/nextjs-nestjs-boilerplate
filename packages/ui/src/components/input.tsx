"use client";

import { InputHTMLAttributes } from "react";

import { cn } from "../lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: InputProps) => (
  <input className={cn("input input-bordered", className)} {...props} />
);

type InputWrapperProps = {
  className?: string;
  label?: string;
  error?: string;
  children: React.ReactNode;
};

export const InputWrapper = ({
  className,
  label,
  error,
  children,
}: InputWrapperProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label className={("gap-2 ui-text-error", error && "text-error")}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-error">{error}</span>}
    </div>
  );
};
