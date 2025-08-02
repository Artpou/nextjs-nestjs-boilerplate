"use client";

import { useEffect } from "react";

import { Button } from "@workspace/ui/components/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-2">
      {process.env.NODE_ENV === "development" ? (
        <>
          <span>{error.message}</span>
          <span className="text-sm text-muted-foreground">{error.stack}</span>
        </>
      ) : (
        <h2>Something went wrong!</h2>
      )}
      <Button className="w-fit" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
