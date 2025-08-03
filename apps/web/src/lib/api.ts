import type { Session } from 'next-auth';
import createClient, { type Middleware } from 'openapi-fetch';
import createReactQueryClient from 'openapi-react-query';

import type { paths } from '@workspace/openapi';

import { auth } from '@/auth';

export type { Middleware };

export const authMiddleware = (
  getSession: () => Promise<Session | null>,
): Middleware => ({
  async onRequest({ request }) {
    try {
      const session = await getSession();

      if (session?.access_token) {
        request.headers.set('Authorization', `Bearer ${session.access_token}`);
      }
    } catch (error) {
      /** biome-ignore lint/suspicious/noConsole: need auth logs */
      console.warn('Failed to get session for API request:', error);
    }
  },
});

export const openapi = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
});
openapi.use(authMiddleware(auth));
export const openapiQuery = createReactQueryClient(openapi);
