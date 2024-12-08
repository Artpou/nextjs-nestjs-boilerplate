"use client";

import { cn } from "../lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export function Button({
  className,
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn("btn p-4", className)} {...props}>
      {isLoading ? (
        <span className="loading loading-spinner loading-lg" />
      ) : (
        children
      )}
    </button>
  );
}
