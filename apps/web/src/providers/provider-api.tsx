"use client";

import { createContext, useEffect } from "react";

import { getSession } from "next-auth/react";
import createClient from "openapi-fetch";

import { paths } from "@workspace/openapi";

import { authMiddleware, client, Middleware } from "@/lib/api";

export type APIContextType = ReturnType<typeof createClient<paths>>;

export const APIContext = createContext<APIContextType | null>(null);

export function APIProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let middleware: Middleware;

    const setupAuth = async () => {
      middleware = authMiddleware(getSession);
      await client.use(middleware);
    };

    setupAuth();

    return () => {
      if (middleware) client.eject(middleware);
    };
  }, []);

  return <APIContext.Provider value={client}>{children}</APIContext.Provider>;
}
