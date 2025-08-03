import 'next-auth';

declare module 'next-auth' {
  interface Session {
    access_token: string;
    refresh_token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    provider?: string;
  }
}
