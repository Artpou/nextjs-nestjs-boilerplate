import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
dotenv.config();

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/core/database/db.schema.ts',
  out: './src/core/database/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
});
