import type { Session } from 'next-auth';
import createClient, { type Middleware } from 'openapi-fetch';

import type { paths } from '@workspace/openapi';

import { auth } from '@/auth';

export type { Middleware };

export const authMiddleware = (
  getSession: () => Promise<Session | null>,
): Middleware => ({
  async onRequest({ request }) {
    (await auth()) || {};

    const session = await getSession();
    if (session) {
      request.headers.set('Authorization', `Bearer ${session.access_token}`);
    }
  },
});

export const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export function getAPI() {
  client.use(authMiddleware(auth));
  return client;
}
