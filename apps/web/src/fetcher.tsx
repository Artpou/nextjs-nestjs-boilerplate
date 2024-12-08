import createClient from "openapi-fetch";
import { paths } from "@repo/openapi";

const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const { GET, POST } = client;
