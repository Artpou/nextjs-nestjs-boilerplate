import { z } from 'zod';

export const environmentSchema = z.object({
  DATABASE_URL: z.string(),
});

export type EnvironmentVariables = z.infer<typeof environmentSchema>;
