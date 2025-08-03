'use client';

import { createContext, useEffect } from 'react';

import { getSession } from 'next-auth/react';
import type createClient from 'openapi-fetch';

import type { paths } from '@workspace/openapi';

import { authMiddleware, type Middleware, openapi } from '@/lib/api';

export type APIContextType = ReturnType<typeof createClient<paths>>;

export const APIContext = createContext<APIContextType | null>(null);

export function APIProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let middleware: Middleware;

    const setupAuth = async () => {
      middleware = authMiddleware(getSession);
      await openapi.use(middleware);
    };

    setupAuth();

    return () => {
      if (middleware) openapi.eject(middleware);
    };
  }, []);

  return <APIContext.Provider value={openapi}>{children}</APIContext.Provider>;
}
